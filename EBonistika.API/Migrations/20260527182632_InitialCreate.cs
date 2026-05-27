using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace EBonistika.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Collections",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Collections", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Series",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CollectionId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    YearFrom = table.Column<int>(type: "integer", nullable: false),
                    YearTo = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Series", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Series_Collections_CollectionId",
                        column: x => x.CollectionId,
                        principalTable: "Collections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CollectionId = table.Column<Guid>(type: "uuid", nullable: false),
                    SeriesId = table.Column<Guid>(type: "uuid", nullable: false),
                    Kind = table.Column<string>(type: "text", nullable: false),
                    Nominal = table.Column<string>(type: "text", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    Year = table.Column<int>(type: "integer", nullable: false),
                    Condition = table.Column<string>(type: "text", nullable: false),
                    Count = table.Column<int>(type: "integer", nullable: false),
                    YearFrom = table.Column<int>(type: "integer", nullable: false),
                    YearTo = table.Column<int>(type: "integer", nullable: false),
                    PurchasePrice = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    PurchaseCurrency = table.Column<string>(type: "text", nullable: true),
                    PurchaseDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: false),
                    ObverseUrl = table.Column<string>(type: "text", nullable: true),
                    ReverseUrl = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_Collections_CollectionId",
                        column: x => x.CollectionId,
                        principalTable: "Collections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Items_Series_SeriesId",
                        column: x => x.SeriesId,
                        principalTable: "Series",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Collections",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("11111111-0000-0000-0000-000000000001"), "Монеты Российской Империи" },
                    { new Guid("22222222-0000-0000-0000-000000000002"), "Советские монеты 1921–1991" },
                    { new Guid("33333333-0000-0000-0000-000000000003"), "Современная Россия 1992–2025" }
                });

            migrationBuilder.InsertData(
                table: "Series",
                columns: new[] { "Id", "CollectionId", "CreatedAt", "Name", "YearFrom", "YearTo" },
                values: new object[,]
                {
                    { new Guid("aaa10001-0000-0000-0000-000000000000"), new Guid("11111111-0000-0000-0000-000000000001"), new DateTimeOffset(new DateTime(2025, 12, 1, 10, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Павел I", 1796, 1801 },
                    { new Guid("aaa10002-0000-0000-0000-000000000000"), new Guid("11111111-0000-0000-0000-000000000001"), new DateTimeOffset(new DateTime(2026, 4, 30, 10, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Николай II", 1894, 1917 },
                    { new Guid("aaa20001-0000-0000-0000-000000000000"), new Guid("22222222-0000-0000-0000-000000000002"), new DateTimeOffset(new DateTime(2026, 2, 4, 10, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Ранние советские монеты", 1921, 1957 },
                    { new Guid("aaa20002-0000-0000-0000-000000000000"), new Guid("22222222-0000-0000-0000-000000000002"), new DateTimeOffset(new DateTime(2026, 3, 12, 10, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "После реформы 1961", 1961, 1991 },
                    { new Guid("aaa20003-0000-0000-0000-000000000000"), new Guid("22222222-0000-0000-0000-000000000002"), new DateTimeOffset(new DateTime(2026, 4, 21, 10, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Юбилейные рубли", 1965, 1991 },
                    { new Guid("aaa30001-0000-0000-0000-000000000000"), new Guid("33333333-0000-0000-0000-000000000003"), new DateTimeOffset(new DateTime(2026, 1, 8, 10, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Ельцинская эпоха", 1992, 1998 },
                    { new Guid("aaa30002-0000-0000-0000-000000000000"), new Guid("33333333-0000-0000-0000-000000000003"), new DateTimeOffset(new DateTime(2026, 2, 19, 10, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "После деноминации", 1998, 2014 }
                });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "CollectionId", "Condition", "Count", "Country", "Currency", "Kind", "Nominal", "Notes", "ObverseUrl", "PurchaseCurrency", "PurchaseDate", "PurchasePrice", "ReverseUrl", "SeriesId", "Year", "YearFrom", "YearTo" },
                values: new object[,]
                {
                    { new Guid("b1000001-0000-0000-0000-000000000000"), new Guid("11111111-0000-0000-0000-000000000001"), "XF", 1, "Российская Империя", "Рубль", "coin", "1", "Куплена на аукционе, оригинальная патина, без следов чистки.", null, "RUB", new DateTimeOffset(new DateTime(2025, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 8500m, null, new Guid("aaa10001-0000-0000-0000-000000000000"), 1797, 1796, 1801 },
                    { new Guid("b1000002-0000-0000-0000-000000000000"), new Guid("11111111-0000-0000-0000-000000000001"), "VF", 1, "Российская Империя", "Рубль", "coin", "5", "", null, "RUB", new DateTimeOffset(new DateTime(2025, 5, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 12000m, null, new Guid("aaa10001-0000-0000-0000-000000000000"), 1799, 1796, 1801 },
                    { new Guid("b1000003-0000-0000-0000-000000000000"), new Guid("11111111-0000-0000-0000-000000000001"), "AU", 1, "Российская Империя", "Рубль", "coin", "10", "Редкий год чеканки.", null, "RUB", new DateTimeOffset(new DateTime(2025, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 45000m, null, new Guid("aaa10001-0000-0000-0000-000000000000"), 1801, 1796, 1801 },
                    { new Guid("b1000004-0000-0000-0000-000000000000"), new Guid("11111111-0000-0000-0000-000000000001"), "VF", 2, "Российская Империя", "Копейка", "coin", "10", "", null, "RUB", new DateTimeOffset(new DateTime(2024, 11, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 2200m, null, new Guid("aaa10002-0000-0000-0000-000000000000"), 1895, 1894, 1917 },
                    { new Guid("b1000005-0000-0000-0000-000000000000"), new Guid("11111111-0000-0000-0000-000000000001"), "XF", 1, "Российская Империя", "Рубль", "coin", "1", "Хранится в холдере PCGS.", null, "RUB", new DateTimeOffset(new DateTime(2025, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 9800m, null, new Guid("aaa10002-0000-0000-0000-000000000000"), 1901, 1894, 1917 },
                    { new Guid("b1000006-0000-0000-0000-000000000000"), new Guid("11111111-0000-0000-0000-000000000001"), "UNC", 1, "Российская Империя", "Копейка", "coin", "50", "300-летие дома Романовых.", null, "RUB", new DateTimeOffset(new DateTime(2025, 7, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 15000m, null, new Guid("aaa10002-0000-0000-0000-000000000000"), 1913, 1894, 1917 },
                    { new Guid("b2000001-0000-0000-0000-000000000000"), new Guid("22222222-0000-0000-0000-000000000002"), "VF", 3, "СССР", "Копейка", "coin", "1", "Куплена на аукционе, оригинальная патина, без следов чистки. Хранится в холдере PCGS.", null, "RUB", new DateTimeOffset(new DateTime(2025, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 350m, null, new Guid("aaa20001-0000-0000-0000-000000000000"), 1924, 1921, 1957 },
                    { new Guid("b2000002-0000-0000-0000-000000000000"), new Guid("22222222-0000-0000-0000-000000000002"), "XF", 1, "СССР", "Копейки", "coin", "3", "", null, "RUB", new DateTimeOffset(new DateTime(2025, 4, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 700m, null, new Guid("aaa20001-0000-0000-0000-000000000000"), 1931, 1921, 1957 },
                    { new Guid("b2000003-0000-0000-0000-000000000000"), new Guid("22222222-0000-0000-0000-000000000002"), "AU", 2, "СССР", "Копеек", "coin", "20", "Военная чеканка.", null, "RUB", new DateTimeOffset(new DateTime(2025, 6, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 1200m, null, new Guid("aaa20001-0000-0000-0000-000000000000"), 1943, 1921, 1957 },
                    { new Guid("b2000004-0000-0000-0000-000000000000"), new Guid("22222222-0000-0000-0000-000000000002"), "VG", 1, "СССР", "Копеек", "coin", "50", "", null, "RUB", new DateTimeOffset(new DateTime(2025, 8, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 2500m, null, new Guid("aaa20001-0000-0000-0000-000000000000"), 1925, 1921, 1957 },
                    { new Guid("b2000005-0000-0000-0000-000000000000"), new Guid("22222222-0000-0000-0000-000000000002"), "UNC", 5, "СССР", "Копейка", "coin", "1", "", null, "RUB", new DateTimeOffset(new DateTime(2025, 1, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 120m, null, new Guid("aaa20002-0000-0000-0000-000000000000"), 1961, 1961, 1991 },
                    { new Guid("b2000006-0000-0000-0000-000000000000"), new Guid("22222222-0000-0000-0000-000000000002"), "XF", 2, "СССР", "Копеек", "coin", "10", "", null, "RUB", new DateTimeOffset(new DateTime(2025, 3, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 180m, null, new Guid("aaa20002-0000-0000-0000-000000000000"), 1974, 1961, 1991 },
                    { new Guid("b2000007-0000-0000-0000-000000000000"), new Guid("22222222-0000-0000-0000-000000000002"), "AU", 1, "СССР", "Рубль", "coin", "1", "Последние годы СССР.", null, "RUB", new DateTimeOffset(new DateTime(2025, 5, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 340m, null, new Guid("aaa20002-0000-0000-0000-000000000000"), 1988, 1961, 1991 },
                    { new Guid("b2000008-0000-0000-0000-000000000000"), new Guid("22222222-0000-0000-0000-000000000002"), "XF", 1, "СССР", "Рубль", "coin", "1", "20 лет Победы.", null, "RUB", new DateTimeOffset(new DateTime(2024, 12, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 1800m, null, new Guid("aaa20003-0000-0000-0000-000000000000"), 1965, 1965, 1991 },
                    { new Guid("b2000009-0000-0000-0000-000000000000"), new Guid("22222222-0000-0000-0000-000000000002"), "AU", 1, "СССР", "Рубль", "coin", "1", "100 лет со дня рождения Ленина.", null, "RUB", new DateTimeOffset(new DateTime(2025, 2, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 2400m, null, new Guid("aaa20003-0000-0000-0000-000000000000"), 1970, 1965, 1991 },
                    { new Guid("b2000010-0000-0000-0000-000000000000"), new Guid("22222222-0000-0000-0000-000000000002"), "UNC", 2, "СССР", "Рубль", "coin", "1", "Олимпийские игры Москва-1980.", null, "RUB", new DateTimeOffset(new DateTime(2025, 6, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 3200m, null, new Guid("aaa20003-0000-0000-0000-000000000000"), 1980, 1965, 1991 },
                    { new Guid("b3000001-0000-0000-0000-000000000000"), new Guid("33333333-0000-0000-0000-000000000003"), "VF", 3, "Россия", "Рубль", "coin", "1", "", null, "RUB", new DateTimeOffset(new DateTime(2025, 1, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 95m, null, new Guid("aaa30001-0000-0000-0000-000000000000"), 1992, 1992, 1998 },
                    { new Guid("b3000002-0000-0000-0000-000000000000"), new Guid("33333333-0000-0000-0000-000000000003"), "XF", 1, "Россия", "Рублей", "coin", "50", "", null, "RUB", new DateTimeOffset(new DateTime(2025, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 200m, null, new Guid("aaa30001-0000-0000-0000-000000000000"), 1993, 1992, 1998 },
                    { new Guid("b3000003-0000-0000-0000-000000000000"), new Guid("33333333-0000-0000-0000-000000000003"), "AU", 1, "Россия", "Рублей", "coin", "500", "Деноминация на подходе.", null, "RUB", new DateTimeOffset(new DateTime(2025, 7, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 650m, null, new Guid("aaa30001-0000-0000-0000-000000000000"), 1995, 1992, 1998 },
                    { new Guid("b3000004-0000-0000-0000-000000000000"), new Guid("33333333-0000-0000-0000-000000000003"), "UNC", 5, "Россия", "Рубль", "coin", "1", "Первый год после деноминации.", null, "RUB", new DateTimeOffset(new DateTime(2025, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 60m, null, new Guid("aaa30002-0000-0000-0000-000000000000"), 1998, 1998, 2014 },
                    { new Guid("b3000005-0000-0000-0000-000000000000"), new Guid("33333333-0000-0000-0000-000000000003"), "AU", 2, "Россия", "Рубля", "coin", "2", "", null, "RUB", new DateTimeOffset(new DateTime(2025, 4, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 80m, null, new Guid("aaa30002-0000-0000-0000-000000000000"), 2001, 1998, 2014 },
                    { new Guid("b3000006-0000-0000-0000-000000000000"), new Guid("33333333-0000-0000-0000-000000000003"), "XF", 3, "Россия", "Рублей", "coin", "10", "", null, "RUB", new DateTimeOffset(new DateTime(2025, 8, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 120m, null, new Guid("aaa30002-0000-0000-0000-000000000000"), 2009, 1998, 2014 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_CollectionId",
                table: "Items",
                column: "CollectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_SeriesId",
                table: "Items",
                column: "SeriesId");

            migrationBuilder.CreateIndex(
                name: "IX_Series_CollectionId",
                table: "Series",
                column: "CollectionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Series");

            migrationBuilder.DropTable(
                name: "Collections");
        }
    }
}
