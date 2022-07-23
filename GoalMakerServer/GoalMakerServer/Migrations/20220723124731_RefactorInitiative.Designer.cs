﻿// <auto-generated />
using System;
using GoalMakerServer.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GoalMakerServer.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220723124731_RefactorInitiative")]
    partial class RefactorInitiative
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("GoalMakerServer.Entities.Cycle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("TeamId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TeamId");

                    b.ToTable("Cycles");
                });

            modelBuilder.Entity("GoalMakerServer.Entities.Goal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("ConfidenceLevel")
                        .HasColumnType("int");

                    b.Property<int>("CycleId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("GoalOwnerId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PercentageOfSuccess")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("TeamId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CycleId");

                    b.HasIndex("GoalOwnerId");

                    b.HasIndex("TeamId");

                    b.ToTable("Goals");
                });

            modelBuilder.Entity("GoalMakerServer.Entities.Initiative", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Comments")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("InitiativeState")
                        .HasColumnType("int");

                    b.Property<int>("KeyResultId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OwnerId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("KeyResultId");

                    b.HasIndex("OwnerId");

                    b.ToTable("Initiatives");
                });

            modelBuilder.Entity("GoalMakerServer.Entities.KeyResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("ConfidenceLevel")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("GoalId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OwnerId")
                        .HasColumnType("int");

                    b.Property<int>("PercentageOfSuccess")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("GoalId");

                    b.HasIndex("OwnerId");

                    b.ToTable("KeyResults");
                });

            modelBuilder.Entity("GoalMakerServer.Entities.Organization", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Organizations");
                });

            modelBuilder.Entity("GoalMakerServer.Entities.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OrganizationId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OrganizationId");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("GoalMakerServer.Entities.TeamMember", b =>
                {
                    b.Property<int>("TeamId")
                        .HasColumnType("int");

                    b.Property<int>("MemberId")
                        .HasColumnType("int");

                    b.Property<bool>("IsOwner")
                        .HasColumnType("bit");

                    b.HasKey("TeamId", "MemberId");

                    b.HasIndex("MemberId");

                    b.ToTable("TeamsUsers");
                });

            modelBuilder.Entity("GoalMakerServer.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OrganizationId")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("OrganizationId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("GoalMakerServer.Entities.Cycle", b =>
                {
                    b.HasOne("GoalMakerServer.Entities.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Team");
                });

            modelBuilder.Entity("GoalMakerServer.Entities.Goal", b =>
                {
                    b.HasOne("GoalMakerServer.Entities.Cycle", "Cycle")
                        .WithMany()
                        .HasForeignKey("CycleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GoalMakerServer.Entities.User", "GoalOwner")
                        .WithMany()
                        .HasForeignKey("GoalOwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GoalMakerServer.Entities.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Cycle");

                    b.Navigation("GoalOwner");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("GoalMakerServer.Entities.Initiative", b =>
                {
                    b.HasOne("GoalMakerServer.Entities.KeyResult", "KeyResult")
                        .WithMany()
                        .HasForeignKey("KeyResultId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GoalMakerServer.Entities.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("KeyResult");

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("GoalMakerServer.Entities.KeyResult", b =>
                {
                    b.HasOne("GoalMakerServer.Entities.Goal", "Goal")
                        .WithMany()
                        .HasForeignKey("GoalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GoalMakerServer.Entities.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Goal");

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("GoalMakerServer.Entities.Team", b =>
                {
                    b.HasOne("GoalMakerServer.Entities.Organization", "Organization")
                        .WithMany()
                        .HasForeignKey("OrganizationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Organization");
                });

            modelBuilder.Entity("GoalMakerServer.Entities.TeamMember", b =>
                {
                    b.HasOne("GoalMakerServer.Entities.User", "Member")
                        .WithMany()
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GoalMakerServer.Entities.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Member");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("GoalMakerServer.Entities.User", b =>
                {
                    b.HasOne("GoalMakerServer.Entities.Organization", "Organization")
                        .WithMany()
                        .HasForeignKey("OrganizationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Organization");
                });
#pragma warning restore 612, 618
        }
    }
}
