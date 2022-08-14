using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GoalMakerServer.Entities
{
    public class GoalDependedTeam
    {
        [ForeignKey("Team")]
        public int TeamId { get; set; }
        public Team Team { get; set; }

        [ForeignKey("Goal")]
        public int GoalId { get; set; }
        public Goal Goal { get; set; }
    }
}
