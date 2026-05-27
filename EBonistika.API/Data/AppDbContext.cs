using EBonistika.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace EBonistika.API.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Collection> Collections => Set<Collection>();
    public DbSet<Series> Series => Set<Series>();
    public DbSet<Item> Items => Set<Item>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Collection>(e =>
        {
            e.HasKey(c => c.Id);
            e.HasMany(c => c.Series)
             .WithOne(s => s.Collection)
             .HasForeignKey(s => s.CollectionId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Series>(e =>
        {
            e.HasKey(s => s.Id);
            e.HasMany(s => s.Items)
             .WithOne(i => i.Series)
             .HasForeignKey(i => i.SeriesId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Item>(e =>
        {
            e.HasKey(i => i.Id);
            e.Property(i => i.PurchasePrice).HasColumnType("numeric(18,2)");
        });

        // ── Seed data ──────────────────────────────────────────────────────────

        var col1 = Guid.Parse("11111111-0000-0000-0000-000000000001");
        var col2 = Guid.Parse("22222222-0000-0000-0000-000000000002");
        var col3 = Guid.Parse("33333333-0000-0000-0000-000000000003");

        modelBuilder.Entity<Collection>().HasData(
            new Collection { Id = col1, Name = "Монеты Российской Империи" },
            new Collection { Id = col2, Name = "Советские монеты 1921–1991" },
            new Collection { Id = col3, Name = "Современная Россия 1992–2025" }
        );

        var sPavelI      = Guid.Parse("aaa10001-0000-0000-0000-000000000000");
        var sNikolayII   = Guid.Parse("aaa10002-0000-0000-0000-000000000000");
        var sSovietEarly = Guid.Parse("aaa20001-0000-0000-0000-000000000000");
        var sReform1961  = Guid.Parse("aaa20002-0000-0000-0000-000000000000");
        var sJubilee     = Guid.Parse("aaa20003-0000-0000-0000-000000000000");
        var sYeltsin     = Guid.Parse("aaa30001-0000-0000-0000-000000000000");
        var sPostReform  = Guid.Parse("aaa30002-0000-0000-0000-000000000000");

        modelBuilder.Entity<Series>().HasData(
            new Series { Id = sPavelI,      CollectionId = col1, Name = "Павел I",                   YearFrom = 1796, YearTo = 1801, CreatedAt = new DateTimeOffset(2025, 12,  1, 10, 0, 0, TimeSpan.Zero) },
            new Series { Id = sNikolayII,   CollectionId = col1, Name = "Николай II",                YearFrom = 1894, YearTo = 1917, CreatedAt = new DateTimeOffset(2026,  4, 30, 10, 0, 0, TimeSpan.Zero) },
            new Series { Id = sSovietEarly, CollectionId = col2, Name = "Ранние советские монеты",   YearFrom = 1921, YearTo = 1957, CreatedAt = new DateTimeOffset(2026,  2,  4, 10, 0, 0, TimeSpan.Zero) },
            new Series { Id = sReform1961,  CollectionId = col2, Name = "После реформы 1961",        YearFrom = 1961, YearTo = 1991, CreatedAt = new DateTimeOffset(2026,  3, 12, 10, 0, 0, TimeSpan.Zero) },
            new Series { Id = sJubilee,     CollectionId = col2, Name = "Юбилейные рубли",           YearFrom = 1965, YearTo = 1991, CreatedAt = new DateTimeOffset(2026,  4, 21, 10, 0, 0, TimeSpan.Zero) },
            new Series { Id = sYeltsin,     CollectionId = col3, Name = "Ельцинская эпоха",          YearFrom = 1992, YearTo = 1998, CreatedAt = new DateTimeOffset(2026,  1,  8, 10, 0, 0, TimeSpan.Zero) },
            new Series { Id = sPostReform,  CollectionId = col3, Name = "После деноминации",         YearFrom = 1998, YearTo = 2014, CreatedAt = new DateTimeOffset(2026,  2, 19, 10, 0, 0, TimeSpan.Zero) }
        );

        modelBuilder.Entity<Item>().HasData(
            // Павел I
            new Item { Id = Guid.Parse("b1000001-0000-0000-0000-000000000000"), CollectionId = col1, SeriesId = sPavelI,      Kind = "coin", Nominal = "1",   Currency = "Рубль",   Country = "Российская Империя", Year = 1797, Condition = "XF",  Count = 1, YearFrom = 1796, YearTo = 1801, PurchasePrice =  8500m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  3, 10, 0,0,0, TimeSpan.Zero), Notes = "Куплена на аукционе, оригинальная патина, без следов чистки." },
            new Item { Id = Guid.Parse("b1000002-0000-0000-0000-000000000000"), CollectionId = col1, SeriesId = sPavelI,      Kind = "coin", Nominal = "5",   Currency = "Рубль",   Country = "Российская Империя", Year = 1799, Condition = "VF",  Count = 1, YearFrom = 1796, YearTo = 1801, PurchasePrice = 12000m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  5, 22, 0,0,0, TimeSpan.Zero), Notes = "" },
            new Item { Id = Guid.Parse("b1000003-0000-0000-0000-000000000000"), CollectionId = col1, SeriesId = sPavelI,      Kind = "coin", Nominal = "10",  Currency = "Рубль",   Country = "Российская Империя", Year = 1801, Condition = "AU",  Count = 1, YearFrom = 1796, YearTo = 1801, PurchasePrice = 45000m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  9,  1, 0,0,0, TimeSpan.Zero), Notes = "Редкий год чеканки." },
            // Николай II
            new Item { Id = Guid.Parse("b1000004-0000-0000-0000-000000000000"), CollectionId = col1, SeriesId = sNikolayII,  Kind = "coin", Nominal = "10",  Currency = "Копейка", Country = "Российская Империя", Year = 1895, Condition = "VF",  Count = 2, YearFrom = 1894, YearTo = 1917, PurchasePrice =  2200m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2024, 11,  5, 0,0,0, TimeSpan.Zero), Notes = "" },
            new Item { Id = Guid.Parse("b1000005-0000-0000-0000-000000000000"), CollectionId = col1, SeriesId = sNikolayII,  Kind = "coin", Nominal = "1",   Currency = "Рубль",   Country = "Российская Империя", Year = 1901, Condition = "XF",  Count = 1, YearFrom = 1894, YearTo = 1917, PurchasePrice =  9800m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  1, 15, 0,0,0, TimeSpan.Zero), Notes = "Хранится в холдере PCGS." },
            new Item { Id = Guid.Parse("b1000006-0000-0000-0000-000000000000"), CollectionId = col1, SeriesId = sNikolayII,  Kind = "coin", Nominal = "50",  Currency = "Копейка", Country = "Российская Империя", Year = 1913, Condition = "UNC", Count = 1, YearFrom = 1894, YearTo = 1917, PurchasePrice = 15000m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  7, 30, 0,0,0, TimeSpan.Zero), Notes = "300-летие дома Романовых." },
            // Ранние советские монеты
            new Item { Id = Guid.Parse("b2000001-0000-0000-0000-000000000000"), CollectionId = col2, SeriesId = sSovietEarly, Kind = "coin", Nominal = "1",  Currency = "Копейка", Country = "СССР", Year = 1924, Condition = "VF",  Count = 3, YearFrom = 1921, YearTo = 1957, PurchasePrice =  350m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  2, 10, 0,0,0, TimeSpan.Zero), Notes = "Куплена на аукционе, оригинальная патина, без следов чистки. Хранится в холдере PCGS." },
            new Item { Id = Guid.Parse("b2000002-0000-0000-0000-000000000000"), CollectionId = col2, SeriesId = sSovietEarly, Kind = "coin", Nominal = "3",  Currency = "Копейки", Country = "СССР", Year = 1931, Condition = "XF",  Count = 1, YearFrom = 1921, YearTo = 1957, PurchasePrice =  700m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  4, 18, 0,0,0, TimeSpan.Zero), Notes = "" },
            new Item { Id = Guid.Parse("b2000003-0000-0000-0000-000000000000"), CollectionId = col2, SeriesId = sSovietEarly, Kind = "coin", Nominal = "20", Currency = "Копеек",  Country = "СССР", Year = 1943, Condition = "AU",  Count = 2, YearFrom = 1921, YearTo = 1957, PurchasePrice = 1200m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  6,  5, 0,0,0, TimeSpan.Zero), Notes = "Военная чеканка." },
            new Item { Id = Guid.Parse("b2000004-0000-0000-0000-000000000000"), CollectionId = col2, SeriesId = sSovietEarly, Kind = "coin", Nominal = "50", Currency = "Копеек",  Country = "СССР", Year = 1925, Condition = "VG",  Count = 1, YearFrom = 1921, YearTo = 1957, PurchasePrice = 2500m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  8, 20, 0,0,0, TimeSpan.Zero), Notes = "" },
            // После реформы 1961
            new Item { Id = Guid.Parse("b2000005-0000-0000-0000-000000000000"), CollectionId = col2, SeriesId = sReform1961, Kind = "coin", Nominal = "1",  Currency = "Копейка", Country = "СССР", Year = 1961, Condition = "UNC", Count = 5, YearFrom = 1961, YearTo = 1991, PurchasePrice =  120m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  1,  8, 0,0,0, TimeSpan.Zero), Notes = "" },
            new Item { Id = Guid.Parse("b2000006-0000-0000-0000-000000000000"), CollectionId = col2, SeriesId = sReform1961, Kind = "coin", Nominal = "10", Currency = "Копеек",  Country = "СССР", Year = 1974, Condition = "XF",  Count = 2, YearFrom = 1961, YearTo = 1991, PurchasePrice =  180m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  3, 25, 0,0,0, TimeSpan.Zero), Notes = "" },
            new Item { Id = Guid.Parse("b2000007-0000-0000-0000-000000000000"), CollectionId = col2, SeriesId = sReform1961, Kind = "coin", Nominal = "1",  Currency = "Рубль",   Country = "СССР", Year = 1988, Condition = "AU",  Count = 1, YearFrom = 1961, YearTo = 1991, PurchasePrice =  340m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  5, 12, 0,0,0, TimeSpan.Zero), Notes = "Последние годы СССР." },
            // Юбилейные рубли
            new Item { Id = Guid.Parse("b2000008-0000-0000-0000-000000000000"), CollectionId = col2, SeriesId = sJubilee, Kind = "coin", Nominal = "1", Currency = "Рубль", Country = "СССР", Year = 1965, Condition = "XF",  Count = 1, YearFrom = 1965, YearTo = 1991, PurchasePrice = 1800m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2024, 12, 10, 0,0,0, TimeSpan.Zero), Notes = "20 лет Победы." },
            new Item { Id = Guid.Parse("b2000009-0000-0000-0000-000000000000"), CollectionId = col2, SeriesId = sJubilee, Kind = "coin", Nominal = "1", Currency = "Рубль", Country = "СССР", Year = 1970, Condition = "AU",  Count = 1, YearFrom = 1965, YearTo = 1991, PurchasePrice = 2400m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  2, 28, 0,0,0, TimeSpan.Zero), Notes = "100 лет со дня рождения Ленина." },
            new Item { Id = Guid.Parse("b2000010-0000-0000-0000-000000000000"), CollectionId = col2, SeriesId = sJubilee, Kind = "coin", Nominal = "1", Currency = "Рубль", Country = "СССР", Year = 1980, Condition = "UNC", Count = 2, YearFrom = 1965, YearTo = 1991, PurchasePrice = 3200m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  6, 15, 0,0,0, TimeSpan.Zero), Notes = "Олимпийские игры Москва-1980." },
            // Ельцинская эпоха
            new Item { Id = Guid.Parse("b3000001-0000-0000-0000-000000000000"), CollectionId = col3, SeriesId = sYeltsin, Kind = "coin", Nominal = "1",   Currency = "Рубль",  Country = "Россия", Year = 1992, Condition = "VF",  Count = 3, YearFrom = 1992, YearTo = 1998, PurchasePrice =  95m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  1, 20, 0,0,0, TimeSpan.Zero), Notes = "" },
            new Item { Id = Guid.Parse("b3000002-0000-0000-0000-000000000000"), CollectionId = col3, SeriesId = sYeltsin, Kind = "coin", Nominal = "50",  Currency = "Рублей", Country = "Россия", Year = 1993, Condition = "XF",  Count = 1, YearFrom = 1992, YearTo = 1998, PurchasePrice = 200m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  3, 10, 0,0,0, TimeSpan.Zero), Notes = "" },
            new Item { Id = Guid.Parse("b3000003-0000-0000-0000-000000000000"), CollectionId = col3, SeriesId = sYeltsin, Kind = "coin", Nominal = "500", Currency = "Рублей", Country = "Россия", Year = 1995, Condition = "AU",  Count = 1, YearFrom = 1992, YearTo = 1998, PurchasePrice = 650m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  7,  4, 0,0,0, TimeSpan.Zero), Notes = "Деноминация на подходе." },
            // После деноминации
            new Item { Id = Guid.Parse("b3000004-0000-0000-0000-000000000000"), CollectionId = col3, SeriesId = sPostReform, Kind = "coin", Nominal = "1",  Currency = "Рубль",  Country = "Россия", Year = 1998, Condition = "UNC", Count = 5, YearFrom = 1998, YearTo = 2014, PurchasePrice =  60m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  2,  5, 0,0,0, TimeSpan.Zero), Notes = "Первый год после деноминации." },
            new Item { Id = Guid.Parse("b3000005-0000-0000-0000-000000000000"), CollectionId = col3, SeriesId = sPostReform, Kind = "coin", Nominal = "2",  Currency = "Рубля",  Country = "Россия", Year = 2001, Condition = "AU",  Count = 2, YearFrom = 1998, YearTo = 2014, PurchasePrice =  80m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  4, 22, 0,0,0, TimeSpan.Zero), Notes = "" },
            new Item { Id = Guid.Parse("b3000006-0000-0000-0000-000000000000"), CollectionId = col3, SeriesId = sPostReform, Kind = "coin", Nominal = "10", Currency = "Рублей", Country = "Россия", Year = 2009, Condition = "XF",  Count = 3, YearFrom = 1998, YearTo = 2014, PurchasePrice = 120m, PurchaseCurrency = "RUB", PurchaseDate = new DateTimeOffset(2025,  8, 14, 0,0,0, TimeSpan.Zero), Notes = "" }
        );
    }
}
