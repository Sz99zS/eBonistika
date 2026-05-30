namespace EBonistika.API.Entities;

public class Collection
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTimeOffset CreatedAt { get; set; }

    public ICollection<Series> Series { get; set; } = [];
}
