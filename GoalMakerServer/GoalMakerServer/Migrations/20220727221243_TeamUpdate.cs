using Microsoft.EntityFrameworkCore.Migrations;

namespace GoalMakerServer.Migrations
{
    public partial class TeamUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ConfidenceLevel",
                table: "Teams",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PercentageOfSuccess",
                table: "Teams",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "TeamCountry",
                table: "Teams",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConfidenceLevel",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "PercentageOfSuccess",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "TeamCountry",
                table: "Teams");
        }
    }
}
