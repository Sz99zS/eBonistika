using EBonistika.API.Data;
using EBonistika.API.Dtos;
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
                i.ObverseUrl,
                i.ReverseUrl))
            .ToListAsync();
    }
}
