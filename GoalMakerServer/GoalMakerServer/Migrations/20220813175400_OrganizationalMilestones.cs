using Microsoft.EntityFrameworkCore.Migrations;

namespace GoalMakerServer.Migrations
{
    public partial class OrganizationalMilestones : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrganizationalMilestones",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsResolved = table.Column<bool>(type: "bit", nullable: false),
                    OrganizationalKeyResultId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationalMilestones", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrganizationalMilestones_OrganizationalKeyResults_OrganizationalKeyResultId",
                        column: x => x.OrganizationalKeyResultId,
                        principalTable: "OrganizationalKeyResults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationalMilestones_OrganizationalKeyResultId",
                table: "OrganizationalMilestones",
                column: "OrganizationalKeyResultId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrganizationalMilestones");
        }
    }
}
