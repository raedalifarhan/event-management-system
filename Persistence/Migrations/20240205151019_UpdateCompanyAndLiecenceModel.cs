using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCompanyAndLiecenceModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyCapital",
                table: "LicenceDetails");

            migrationBuilder.DropColumn(
                name: "LicenceStatus",
                table: "LicenceDetails");

            migrationBuilder.AddColumn<double>(
                name: "CompanyCapital",
                table: "Companies",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "LicenceStatus",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyCapital",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "LicenceStatus",
                table: "Companies");

            migrationBuilder.AddColumn<double>(
                name: "CompanyCapital",
                table: "LicenceDetails",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "LicenceStatus",
                table: "LicenceDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
