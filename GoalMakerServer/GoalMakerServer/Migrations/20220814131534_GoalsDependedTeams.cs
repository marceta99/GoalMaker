using Microsoft.EntityFrameworkCore.Migrations;

namespace GoalMakerServer.Migrations
{
    public partial class GoalsDependedTeams : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GoalsDependedTeams",
                columns: table => new
                {
                    TeamId = table.Column<int>(type: "int", nullable: false),
                    GoalId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoalsDependedTeams", x => new { x.TeamId, x.GoalId });
                    table.ForeignKey(
                        name: "FK_GoalsDependedTeams_Goals_GoalId",
                        column: x => x.GoalId,
                        principalTable: "Goals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_GoalsDependedTeams_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GoalsDependedTeams_GoalId",
                table: "GoalsDependedTeams",
                column: "GoalId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GoalsDependedTeams");
        }
    }
}
