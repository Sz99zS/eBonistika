namespace EBonistika.API.Dtos;

// TODO (Ваня): расширить под CRUD_CONTRACT.md (раздел 2):
//   public record CollectionDto(Guid Id, string Name, DateTimeOffset CreatedAt, int SeriesCount, int ItemCount);
// + поправить проекцию в CollectionsService. Добавить CreateCollectionDto { string Name } и UpdateCollectionDto { string Name }.
public record CollectionDto(Guid Id, string Name);
