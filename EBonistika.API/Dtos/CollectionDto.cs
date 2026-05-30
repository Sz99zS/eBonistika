namespace EBonistika.API.Dtos;

public record CollectionDto(Guid Id, string Name, DateTimeOffset CreatedAt);
public record CreateCollectionDto(string Name);
public record UpdateCollectionDto(string Name);
