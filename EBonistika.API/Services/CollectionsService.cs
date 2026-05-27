using EBonistika.API.Data;
using EBonistika.API.Dtos;
using Microsoft.EntityFrameworkCore;

namespace EBonistika.API.Services;

public class CollectionsService(AppDbContext db)
{
    public async Task<List<CollectionDto>> GetAllAsync() =>
        await db.Collections
            .Select(c => new CollectionDto(c.Id, c.Name))
            .ToListAsync();
}
