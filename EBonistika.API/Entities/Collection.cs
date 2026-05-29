namespace EBonistika.API.Entities;

public class Collection
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;

    // TODO (Ваня): добавить `public DateTimeOffset CreatedAt { get; set; }` + миграцию.
    // Заполнять DateTimeOffset.UtcNow при создании; в сиде проставить литеральную дату.
    // Подробности — см. CRUD_CONTRACT.md (раздел 0 и 2).

    public ICollection<Series> Series { get; set; } = [];
}
