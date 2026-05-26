using EBonistika.API.Dtos;

namespace EBonistika.API.Data;

internal static class MockSeries
{
    private static readonly Guid Col1 = Guid.Parse("11111111-0000-0000-0000-000000000001");
    private static readonly Guid Col2 = Guid.Parse("22222222-0000-0000-0000-000000000002");
    private static readonly Guid Col3 = Guid.Parse("33333333-0000-0000-0000-000000000003");

    internal static readonly IReadOnlyList<SeriesDto> All =
    [
        // Монеты Российской Империи
        new(Guid.Parse("aaa10001-0000-0000-0000-000000000000"), Col1, "Павел I",      1796, 1801, new DateTimeOffset(2025, 12,  1, 10, 0, 0, TimeSpan.Zero), 5),
        new(Guid.Parse("aaa10002-0000-0000-0000-000000000000"), Col1, "Николай II",   1894, 1917, new DateTimeOffset(2026,  4, 30, 10, 0, 0, TimeSpan.Zero), 9),

        // Советские монеты 1921–1991
        new(Guid.Parse("aaa20001-0000-0000-0000-000000000000"), Col2, "Ранние советские монеты", 1921, 1957, new DateTimeOffset(2026, 2,  4, 10, 0, 0, TimeSpan.Zero), 8),
        new(Guid.Parse("aaa20002-0000-0000-0000-000000000000"), Col2, "После реформы 1961",      1961, 1991, new DateTimeOffset(2026, 3, 12, 10, 0, 0, TimeSpan.Zero), 9),
        new(Guid.Parse("aaa20003-0000-0000-0000-000000000000"), Col2, "Юбилейные рубли",         1965, 1991, new DateTimeOffset(2026, 4, 21, 10, 0, 0, TimeSpan.Zero), 6),

        // Современная Россия 1992–2025
        new(Guid.Parse("aaa30001-0000-0000-0000-000000000000"), Col3, "Ельцинская эпоха",   1992, 1998, new DateTimeOffset(2026, 1,  8, 10, 0, 0, TimeSpan.Zero), 7),
        new(Guid.Parse("aaa30002-0000-0000-0000-000000000000"), Col3, "После деноминации",  1998, 2014, new DateTimeOffset(2026, 2, 19, 10, 0, 0, TimeSpan.Zero), 9),
    ];
}
