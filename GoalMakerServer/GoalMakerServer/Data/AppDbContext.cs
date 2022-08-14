using GoalMakerServer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoalMakerServer.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamMember> TeamsUsers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Goal> Goals { get; set; }
        public DbSet<KeyResult> KeyResults { get; set; }
        public DbSet<Initiative> Initiatives { get; set; }
        public DbSet<Cycle> Cycles { get; set; }
        public DbSet<Milestone> Milestones { get; set; }
        public DbSet<OrganizationalGoal> OrganizationalGoals { get; set; }
        public DbSet<OrganizationalKeyResult> OrganizationalKeyResults { get; set; }
        public DbSet<Organizationalnitiative> Organizationalnitiatives { get; set; }
        public DbSet<OrganizationalMilestone> OrganizationalMilestones { get; set; }
        public DbSet<GoalDependedTeam> GoalsDependedTeams { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TeamMember>().HasKey(ia => new { ia.TeamId, ia.MemberId });
            modelBuilder.Entity<GoalDependedTeam>().HasKey(gt => new { gt.TeamId, gt.GoalId });
        }
    }
}
