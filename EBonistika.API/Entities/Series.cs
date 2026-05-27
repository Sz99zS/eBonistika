namespace EBonistika.API.Entities;

public class Series
{
    public Guid Id { get; set; }
    public Guid CollectionId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int YearFrom { get; set; }
    public int YearTo { get; set; }
    public DateTimeOffset CreatedAt { get; set; }

    public Collection Collection { get; set; } = null!;
    public ICollection<Item> Items { get; set; } = [];
}
