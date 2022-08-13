using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GoalMakerServer.Migrations
{
    public partial class AddOrganizationalGoals : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrganizationalGoals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PercentageOfSuccess = table.Column<double>(type: "float", nullable: false),
                    ConfidenceLevel = table.Column<int>(type: "int", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    GoalOwnerId = table.Column<int>(type: "int", nullable: false),
                    LeadershipTeamId = table.Column<int>(type: "int", nullable: false),
                    CycleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationalGoals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrganizationalGoals_Cycles_CycleId",
                        column: x => x.CycleId,
                        principalTable: "Cycles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrganizationalGoals_Teams_LeadershipTeamId",
                        column: x => x.LeadershipTeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_OrganizationalGoals_Users_GoalOwnerId",
                        column: x => x.GoalOwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationalGoals_CycleId",
                table: "OrganizationalGoals",
                column: "CycleId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationalGoals_GoalOwnerId",
                table: "OrganizationalGoals",
                column: "GoalOwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationalGoals_LeadershipTeamId",
                table: "OrganizationalGoals",
                column: "LeadershipTeamId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrganizationalGoals");
        }
    }
}
