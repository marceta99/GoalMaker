using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GoalMakerServer.Migrations
{
    public partial class OrganizationalKeyResult : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Organizationalnitiatives",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InitiativeState = table.Column<int>(type: "int", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Comments = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OwnerId = table.Column<int>(type: "int", nullable: false),
                    OrganizationalKeyResultId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizationalnitiatives", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Organizationalnitiatives_OrganizationalKeyResults_OrganizationalKeyResultId",
                        column: x => x.OrganizationalKeyResultId,
                        principalTable: "OrganizationalKeyResults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Organizationalnitiatives_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Organizationalnitiatives_OrganizationalKeyResultId",
                table: "Organizationalnitiatives",
                column: "OrganizationalKeyResultId");

            migrationBuilder.CreateIndex(
                name: "IX_Organizationalnitiatives_OwnerId",
                table: "Organizationalnitiatives",
                column: "OwnerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Organizationalnitiatives");
        }
    }
}
