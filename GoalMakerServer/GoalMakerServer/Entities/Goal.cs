using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GoalMakerServer.Entities
{
    public class Goal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int PercentageOfSuccess { get; set; }
        public int ConfidenceLevel { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }


        [ForeignKey("User")]
        public int GoalOwnerId { get; set; }
        public User GoalOwner { get; set; }
        
        [ForeignKey("Team")]
        public int TeamId { get; set; }
        public Team Team { get; set; }

        [ForeignKey("Cycle")]
        public int CycleId { get; set; }
        public Cycle Cycle { get; set; }
    }
}
