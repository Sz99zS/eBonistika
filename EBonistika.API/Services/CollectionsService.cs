using EBonistika.API.Data;
using EBonistika.API.Dtos;
using EBonistika.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace EBonistika.API.Services;

public class CollectionsService(AppDbContext db)
{
    public async Task<List<CollectionDto>> GetAllAsync() =>
        await db.Collections
            .Select(c => new CollectionDto(c.Id, c.Name, c.CreatedAt))
            .ToListAsync();

    public async Task<CollectionDto?> GetByIdAsync(Guid id) =>
        await db.Collections
            .Where(c => c.Id == id)
            .Select(c => new CollectionDto(c.Id, c.Name, c.CreatedAt))
            .FirstOrDefaultAsync();

    public async Task<CollectionDto> CreateAsync(CreateCollectionDto dto)
    {
        var collection = new Collection
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            CreatedAt = DateTimeOffset.UtcNow
        };
        db.Collections.Add(collection);
        await db.SaveChangesAsync();
        return new CollectionDto(collection.Id, collection.Name, collection.CreatedAt);
    }

    public async Task<CollectionDto?> UpdateAsync(Guid id, UpdateCollectionDto dto)
    {
        var collection = await db.Collections.FindAsync(id);
        if (collection is null) return null;
        collection.Name = dto.Name;
        await db.SaveChangesAsync();
        return new CollectionDto(collection.Id, collection.Name, collection.CreatedAt);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var collection = await db.Collections.FindAsync(id);
        if (collection is null) return false;
        db.Collections.Remove(collection);
        await db.SaveChangesAsync();
        return true;
    }
}
