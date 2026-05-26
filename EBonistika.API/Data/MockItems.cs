using EBonistika.API.Dtos;

namespace EBonistika.API.Data;

internal static class MockItems
{
    private static readonly Guid Col1 = Guid.Parse("11111111-0000-0000-0000-000000000001");
    private static readonly Guid Col2 = Guid.Parse("22222222-0000-0000-0000-000000000002");
    private static readonly Guid Col3 = Guid.Parse("33333333-0000-0000-0000-000000000003");

    private static readonly Guid S_PavelI      = Guid.Parse("aaa10001-0000-0000-0000-000000000000");
    private static readonly Guid S_NikolayII   = Guid.Parse("aaa10002-0000-0000-0000-000000000000");
    private static readonly Guid S_SovietEarly = Guid.Parse("aaa20001-0000-0000-0000-000000000000");
    private static readonly Guid S_Reform1961  = Guid.Parse("aaa20002-0000-0000-0000-000000000000");
    private static readonly Guid S_Jubilee     = Guid.Parse("aaa20003-0000-0000-0000-000000000000");
    private static readonly Guid S_Yeltsin     = Guid.Parse("aaa30001-0000-0000-0000-000000000000");
    private static readonly Guid S_PostReform  = Guid.Parse("aaa30002-0000-0000-0000-000000000000");

    internal static readonly IReadOnlyList<ItemDto> All =
    [
        // Павел I (Col1)
        new(Guid.Parse("b1000001-0000-0000-0000-000000000000"), Col1, S_PavelI, "coin", "1",  "Рубль", "Российская Империя", 1797, "XF",  1, 1796, 1801,  8500m, "RUB", new DateTimeOffset(2025,  3, 10, 0,0,0, TimeSpan.Zero), "Куплена на аукционе, оригинальная патина, без следов чистки.", null, null),
        new(Guid.Parse("b1000002-0000-0000-0000-000000000000"), Col1, S_PavelI, "coin", "5",  "Рубль", "Российская Империя", 1799, "VF",  1, 1796, 1801, 12000m, "RUB", new DateTimeOffset(2025,  5, 22, 0,0,0, TimeSpan.Zero), "",                                                               null, null),
        new(Guid.Parse("b1000003-0000-0000-0000-000000000000"), Col1, S_PavelI, "coin", "10", "Рубль", "Российская Империя", 1801, "AU",  1, 1796, 1801, 45000m, "RUB", new DateTimeOffset(2025,  9,  1, 0,0,0, TimeSpan.Zero), "Редкий год чеканки.",                                            null, null),

        // Николай II (Col1)
        new(Guid.Parse("b1000004-0000-0000-0000-000000000000"), Col1, S_NikolayII, "coin", "10", "Копейка", "Российская Империя", 1895, "VF",  2, 1894, 1917,  2200m, "RUB", new DateTimeOffset(2024, 11,  5, 0,0,0, TimeSpan.Zero), "",                null, null),
        new(Guid.Parse("b1000005-0000-0000-0000-000000000000"), Col1, S_NikolayII, "coin", "1",  "Рубль",   "Российская Империя", 1901, "XF",  1, 1894, 1917,  9800m, "RUB", new DateTimeOffset(2025,  1, 15, 0,0,0, TimeSpan.Zero), "Хранится в холдере PCGS.", null, null),
        new(Guid.Parse("b1000006-0000-0000-0000-000000000000"), Col1, S_NikolayII, "coin", "50", "Копейка", "Российская Империя", 1913, "UNC", 1, 1894, 1917, 15000m, "RUB", new DateTimeOffset(2025,  7, 30, 0,0,0, TimeSpan.Zero), "300-летие дома Романовых.", null, null),

        // Ранние советские монеты (Col2)
        new(Guid.Parse("b2000001-0000-0000-0000-000000000000"), Col2, S_SovietEarly, "coin", "1",  "Копейка", "СССР", 1924, "VF",  3, 1921, 1957,   350m, "RUB", new DateTimeOffset(2025,  2, 10, 0,0,0, TimeSpan.Zero), "Куплена на аукционе, оригинальная патина, без следов чистки. Хранится в холдере PCGS.", null, null),
        new(Guid.Parse("b2000002-0000-0000-0000-000000000000"), Col2, S_SovietEarly, "coin", "3",  "Копейки", "СССР", 1931, "XF",  1, 1921, 1957,   700m, "RUB", new DateTimeOffset(2025,  4, 18, 0,0,0, TimeSpan.Zero), "", null, null),
        new(Guid.Parse("b2000003-0000-0000-0000-000000000000"), Col2, S_SovietEarly, "coin", "20", "Копеек",  "СССР", 1943, "AU",  2, 1921, 1957,  1200m, "RUB", new DateTimeOffset(2025,  6,  5, 0,0,0, TimeSpan.Zero), "Военная чеканка.", null, null),
        new(Guid.Parse("b2000004-0000-0000-0000-000000000000"), Col2, S_SovietEarly, "coin", "50", "Копеек",  "СССР", 1925, "VG",  1, 1921, 1957,  2500m, "RUB", new DateTimeOffset(2025,  8, 20, 0,0,0, TimeSpan.Zero), "", null, null),

        // После реформы 1961 (Col2)
        new(Guid.Parse("b2000005-0000-0000-0000-000000000000"), Col2, S_Reform1961, "coin", "1",  "Копейка", "СССР", 1961, "UNC", 5, 1961, 1991,   120m, "RUB", new DateTimeOffset(2025,  1,  8, 0,0,0, TimeSpan.Zero), "", null, null),
        new(Guid.Parse("b2000006-0000-0000-0000-000000000000"), Col2, S_Reform1961, "coin", "10", "Копеек",  "СССР", 1974, "XF",  2, 1961, 1991,   180m, "RUB", new DateTimeOffset(2025,  3, 25, 0,0,0, TimeSpan.Zero), "", null, null),
        new(Guid.Parse("b2000007-0000-0000-0000-000000000000"), Col2, S_Reform1961, "coin", "1",  "Рубль",   "СССР", 1988, "AU",  1, 1961, 1991,   340m, "RUB", new DateTimeOffset(2025,  5, 12, 0,0,0, TimeSpan.Zero), "Последние годы СССР.", null, null),

        // Юбилейные рубли (Col2)
        new(Guid.Parse("b2000008-0000-0000-0000-000000000000"), Col2, S_Jubilee, "coin", "1", "Рубль", "СССР", 1965, "XF",  1, 1965, 1991,  1800m, "RUB", new DateTimeOffset(2024, 12, 10, 0,0,0, TimeSpan.Zero), "20 лет Победы.", null, null),
        new(Guid.Parse("b2000009-0000-0000-0000-000000000000"), Col2, S_Jubilee, "coin", "1", "Рубль", "СССР", 1970, "AU",  1, 1965, 1991,  2400m, "RUB", new DateTimeOffset(2025,  2, 28, 0,0,0, TimeSpan.Zero), "100 лет со дня рождения Ленина.", null, null),
        new(Guid.Parse("b2000010-0000-0000-0000-000000000000"), Col2, S_Jubilee, "coin", "1", "Рубль", "СССР", 1980, "UNC", 2, 1965, 1991,  3200m, "RUB", new DateTimeOffset(2025,  6, 15, 0,0,0, TimeSpan.Zero), "Олимпийские игры Москва-1980.", null, null),

        // Ельцинская эпоха (Col3)
        new(Guid.Parse("b3000001-0000-0000-0000-000000000000"), Col3, S_Yeltsin, "coin", "1",   "Рубль",   "Россия", 1992, "VF",  3, 1992, 1998,   95m, "RUB", new DateTimeOffset(2025,  1, 20, 0,0,0, TimeSpan.Zero), "", null, null),
        new(Guid.Parse("b3000002-0000-0000-0000-000000000000"), Col3, S_Yeltsin, "coin", "50",  "Рублей",  "Россия", 1993, "XF",  1, 1992, 1998,  200m, "RUB", new DateTimeOffset(2025,  3, 10, 0,0,0, TimeSpan.Zero), "", null, null),
        new(Guid.Parse("b3000003-0000-0000-0000-000000000000"), Col3, S_Yeltsin, "coin", "500", "Рублей",  "Россия", 1995, "AU",  1, 1992, 1998,  650m, "RUB", new DateTimeOffset(2025,  7,  4, 0,0,0, TimeSpan.Zero), "Деноминация на подходе.", null, null),

        // После деноминации (Col3)
        new(Guid.Parse("b3000004-0000-0000-0000-000000000000"), Col3, S_PostReform, "coin", "1",  "Рубль",  "Россия", 1998, "UNC", 5, 1998, 2014,   60m, "RUB", new DateTimeOffset(2025,  2,  5, 0,0,0, TimeSpan.Zero), "Первый год после деноминации.", null, null),
        new(Guid.Parse("b3000005-0000-0000-0000-000000000000"), Col3, S_PostReform, "coin", "2",  "Рубля",  "Россия", 2001, "AU",  2, 1998, 2014,   80m, "RUB", new DateTimeOffset(2025,  4, 22, 0,0,0, TimeSpan.Zero), "", null, null),
        new(Guid.Parse("b3000006-0000-0000-0000-000000000000"), Col3, S_PostReform, "coin", "10", "Рублей", "Россия", 2009, "XF",  3, 1998, 2014,  120m, "RUB", new DateTimeOffset(2025,  8, 14, 0,0,0, TimeSpan.Zero), "", null, null),
    ];
}
