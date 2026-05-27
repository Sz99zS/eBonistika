using EBonistika.API.Data;
using EBonistika.API.Dtos;
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
}
