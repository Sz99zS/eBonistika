using EBonistika.API.Dtos;

namespace EBonistika.API.Data;

internal static class MockCollections
{
    internal static readonly IReadOnlyList<CollectionDto> All =
    [
        new(Guid.Parse("11111111-0000-0000-0000-000000000001"), "Монеты Российской Империи"),
        new(Guid.Parse("22222222-0000-0000-0000-000000000002"), "Советские монеты 1921–1991"),
        new(Guid.Parse("33333333-0000-0000-0000-000000000003"), "Современная Россия 1992–2025"),
    ];
}
