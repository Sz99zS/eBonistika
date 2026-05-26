namespace EBonistika.API.Dtos;

public record ItemDto(
    Guid Id,
    Guid CollectionId,
    Guid SeriesId,
    string Kind,
    string Nominal,
    string Currency,
    string Country,
    int Year,
    string Condition,
    int Count,
    int YearFrom,
    int YearTo,
    decimal? PurchasePrice,
    string? PurchaseCurrency,
    DateTimeOffset? PurchaseDate,
    string Notes,
    string? ObverseUrl,
    string? ReverseUrl
    );
