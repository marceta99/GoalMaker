using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GoalMakerServer.Migrations
{
    public partial class OrganizationalKeyResults : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrganizationalKeyResultId",
                table: "Initiatives",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OrganizationalKeyResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PercentageOfSuccess = table.Column<double>(type: "float", nullable: false),
                    ConfidenceLevel = table.Column<int>(type: "int", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: false),
                    OwnerId = table.Column<int>(type: "int", nullable: false),
                    OrganizationalGoalId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationalKeyResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrganizationalKeyResults_OrganizationalGoals_OrganizationalGoalId",
                        column: x => x.OrganizationalGoalId,
                        principalTable: "OrganizationalGoals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrganizationalKeyResults_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Initiatives_OrganizationalKeyResultId",
                table: "Initiatives",
                column: "OrganizationalKeyResultId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationalKeyResults_OrganizationalGoalId",
                table: "OrganizationalKeyResults",
                column: "OrganizationalGoalId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationalKeyResults_OwnerId",
                table: "OrganizationalKeyResults",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Initiatives_OrganizationalKeyResults_OrganizationalKeyResultId",
                table: "Initiatives",
                column: "OrganizationalKeyResultId",
                principalTable: "OrganizationalKeyResults",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Initiatives_OrganizationalKeyResults_OrganizationalKeyResultId",
                table: "Initiatives");

            migrationBuilder.DropTable(
                name: "OrganizationalKeyResults");

            migrationBuilder.DropIndex(
                name: "IX_Initiatives_OrganizationalKeyResultId",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "OrganizationalKeyResultId",
                table: "Initiatives");
        }
    }
}
