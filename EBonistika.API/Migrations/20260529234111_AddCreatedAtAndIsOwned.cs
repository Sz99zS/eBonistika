using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EBonistika.API.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedAtAndIsOwned : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsOwned",
                table: "Items",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreatedAt",
                table: "Collections",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Collections",
                keyColumn: "Id",
                keyValue: new Guid("11111111-0000-0000-0000-000000000001"),
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Collections",
                keyColumn: "Id",
                keyValue: new Guid("22222222-0000-0000-0000-000000000002"),
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Collections",
                keyColumn: "Id",
                keyValue: new Guid("33333333-0000-0000-0000-000000000003"),
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b1000001-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b1000002-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b1000003-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b1000004-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b1000005-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b1000006-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b2000001-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b2000002-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b2000003-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b2000004-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b2000005-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b2000006-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b2000007-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b2000008-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b2000009-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b2000010-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b3000001-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b3000002-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b3000003-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b3000004-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b3000005-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);

            migrationBuilder.UpdateData(
                table: "Items",
                keyColumn: "Id",
                keyValue: new Guid("b3000006-0000-0000-0000-000000000000"),
                column: "IsOwned",
                value: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsOwned",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Collections");
        }
    }
}
