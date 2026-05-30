using EBonistika.API.Data;
using EBonistika.API.Dtos;
using EBonistika.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace EBonistika.API.Services;

public class SeriesService(AppDbContext db)
{
    public async Task<List<SeriesDto>> GetAllAsync(Guid? collectionId)
    {
        var query = db.Series.AsQueryable();

        if (collectionId.HasValue)
            query = query.Where(s => s.CollectionId == collectionId.Value);

        return await query
            .Select(s => new SeriesDto(
                s.Id,
                s.CollectionId,
                s.Name,
                s.YearFrom,
                s.YearTo,
                s.CreatedAt,
                s.Items.Count))
            .ToListAsync();
    }

    public async Task<SeriesDto?> GetByIdAsync(Guid id) =>
        await db.Series
            .Where(s => s.Id == id)
            .Select(s => new SeriesDto(
                s.Id,
                s.CollectionId,
                s.Name,
                s.YearFrom,
                s.YearTo,
                s.CreatedAt,
                s.Items.Count))
            .FirstOrDefaultAsync();

    public async Task<SeriesDto?> CreateAsync(CreateSeriesDto dto)
    {
        if (!await db.Collections.AnyAsync(c => c.Id == dto.CollectionId))
            return null;

        var series = new Series
        {
            Id = Guid.NewGuid(),
            CollectionId = dto.CollectionId,
            Name = dto.Name,
            YearFrom = dto.YearFrom,
            YearTo = dto.YearTo,
            CreatedAt = DateTimeOffset.UtcNow
        };
        db.Series.Add(series);
        await db.SaveChangesAsync();
        return new SeriesDto(series.Id, series.CollectionId, series.Name, series.YearFrom, series.YearTo, series.CreatedAt, 0);
    }

    public async Task<SeriesDto?> UpdateAsync(Guid id, UpdateSeriesDto dto)
    {
        var series = await db.Series.Include(s => s.Items).FirstOrDefaultAsync(s => s.Id == id);
        if (series is null) return null;
        series.Name = dto.Name;
        series.YearFrom = dto.YearFrom;
        series.YearTo = dto.YearTo;
        await db.SaveChangesAsync();
        return new SeriesDto(series.Id, series.CollectionId, series.Name, series.YearFrom, series.YearTo, series.CreatedAt, series.Items.Count);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var series = await db.Series.FindAsync(id);
        if (series is null) return false;
        db.Series.Remove(series);
        await db.SaveChangesAsync();
        return true;
    }
}
