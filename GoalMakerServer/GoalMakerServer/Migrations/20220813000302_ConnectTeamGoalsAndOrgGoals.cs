using Microsoft.EntityFrameworkCore.Migrations;

namespace GoalMakerServer.Migrations
{
    public partial class ConnectTeamGoalsAndOrgGoals : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrganizationalGoalId",
                table: "Goals",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.CreateIndex(
                name: "IX_Goals_OrganizationalGoalId",
                table: "Goals",
                column: "OrganizationalGoalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_OrganizationalGoals_OrganizationalGoalId",
                table: "Goals",
                column: "OrganizationalGoalId",
                principalTable: "OrganizationalGoals",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Goals_OrganizationalGoals_OrganizationalGoalId",
                table: "Goals");

            migrationBuilder.DropIndex(
                name: "IX_Goals_OrganizationalGoalId",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "OrganizationalGoalId",
                table: "Goals");
        }
    }
}
