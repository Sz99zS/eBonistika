using EBonistika.API.Data;
using EBonistika.API.Dtos;
using EBonistika.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace EBonistika.API.Services;

public class ItemsService(AppDbContext db)
{
    public async Task<List<ItemDto>> GetAllAsync(Guid? seriesId)
    {
        var query = db.Items.AsQueryable();

        if (seriesId.HasValue)
            query = query.Where(i => i.SeriesId == seriesId.Value);

        return await query
            .Select(i => new ItemDto(
                i.Id,
                i.CollectionId,
                i.SeriesId,
                i.Kind,
                i.Nominal,
                i.Currency,
                i.Country,
                i.Year,
                i.Condition,
                i.Count,
                i.YearFrom,
                i.YearTo,
                i.PurchasePrice,
                i.PurchaseCurrency,
                i.PurchaseDate,
                i.Notes,
                i.IsOwned,
                i.ObverseUrl,
                i.ReverseUrl))
            .ToListAsync();
    }

    public async Task<ItemDto?> CreateAsync(CreateItemDto dto)
    {
        var series = await db.Series.FindAsync(dto.SeriesId);
        if (series is null) return null;

        var item = new Item
        {
            Id = Guid.NewGuid(),
            CollectionId = series.CollectionId,
            SeriesId = dto.SeriesId,
            Kind = dto.Kind,
            Nominal = dto.Nominal,
            Currency = dto.Currency,
            Country = dto.Country,
            Year = dto.Year,
            Condition = dto.Condition,
            Count = dto.Count,
            YearFrom = dto.YearFrom,
            YearTo = dto.YearTo,
            PurchasePrice = dto.PurchasePrice,
            PurchaseCurrency = dto.PurchaseCurrency,
            PurchaseDate = dto.PurchaseDate,
            Notes = dto.Notes,
            IsOwned = dto.IsOwned,
            ObverseUrl = dto.ObverseUrl,
            ReverseUrl = dto.ReverseUrl
        };
        db.Items.Add(item);
        await db.SaveChangesAsync();
        return new ItemDto(item.Id, item.CollectionId, item.SeriesId, item.Kind, item.Nominal, item.Currency, item.Country, item.Year, item.Condition, item.Count, item.YearFrom, item.YearTo, item.PurchasePrice, item.PurchaseCurrency, item.PurchaseDate, item.Notes, item.IsOwned, item.ObverseUrl, item.ReverseUrl);
    }

    public async Task<ItemDto?> UpdateAsync(Guid id, UpdateItemDto dto)
    {
        var item = await db.Items.FindAsync(id);
        if (item is null) return null;
        item.Kind = dto.Kind;
        item.Nominal = dto.Nominal;
        item.Currency = dto.Currency;
        item.Country = dto.Country;
        item.Year = dto.Year;
        item.Condition = dto.Condition;
        item.Count = dto.Count;
        item.YearFrom = dto.YearFrom;
        item.YearTo = dto.YearTo;
        item.PurchasePrice = dto.PurchasePrice;
        item.PurchaseCurrency = dto.PurchaseCurrency;
        item.PurchaseDate = dto.PurchaseDate;
        item.Notes = dto.Notes;
        item.IsOwned = dto.IsOwned;
        item.ObverseUrl = dto.ObverseUrl;
        item.ReverseUrl = dto.ReverseUrl;
        await db.SaveChangesAsync();
        return new ItemDto(item.Id, item.CollectionId, item.SeriesId, item.Kind, item.Nominal, item.Currency, item.Country, item.Year, item.Condition, item.Count, item.YearFrom, item.YearTo, item.PurchasePrice, item.PurchaseCurrency, item.PurchaseDate, item.Notes, item.IsOwned, item.ObverseUrl, item.ReverseUrl);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var item = await db.Items.FindAsync(id);
        if (item is null) return false;
        db.Items.Remove(item);
        await db.SaveChangesAsync();
        return true;
    }
}
