namespace EBonistika.API.Entities;

public class Item
{
    public Guid Id { get; set; }
    public Guid CollectionId { get; set; }
    public Guid SeriesId { get; set; }
    public string Kind { get; set; } = string.Empty;
    public string Nominal { get; set; } = string.Empty;
    public string Currency { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public int Year { get; set; }
    public string Condition { get; set; } = string.Empty;
    public int Count { get; set; }
    public int YearFrom { get; set; }
    public int YearTo { get; set; }
    public decimal? PurchasePrice { get; set; }
    public string? PurchaseCurrency { get; set; }
    public DateTimeOffset? PurchaseDate { get; set; }
    public string Notes { get; set; } = string.Empty;
    public string? ObverseUrl { get; set; }
    public string? ReverseUrl { get; set; }

    public Collection Collection { get; set; } = null!;
    public Series Series { get; set; } = null!;
}
