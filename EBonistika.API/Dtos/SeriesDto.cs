namespace EBonistika.API.Dtos;

public record SeriesDto(
    Guid Id,
    Guid CollectionId,
    string Name,
    int YearFrom,
    int YearTo,
    DateTimeOffset CreatedAt,
    int ItemCount
    );

public record CreateSeriesDto(Guid CollectionId, string Name, int YearFrom, int YearTo);
public record UpdateSeriesDto(string Name, int YearFrom, int YearTo);
