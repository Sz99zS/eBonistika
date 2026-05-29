namespace EBonistika.API.Dtos;

// TODO (Ваня): добавить CreateSeriesDto / UpdateSeriesDto — см. CRUD_CONTRACT.md (раздел 3).
// Сам SeriesDto менять не нужно.
public record SeriesDto(
    Guid Id,
    Guid CollectionId,
    string Name,
    int YearFrom,
    int YearTo,
    DateTimeOffset CreatedAt,
    int ItemCount
    );
