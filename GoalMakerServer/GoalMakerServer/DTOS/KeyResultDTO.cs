using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoalMakerServer.DTOS
{
    public class KeyResultDTO
    {
        public string Name { get; set; }
        public double PercentageOfSuccess { get; set; }
        public int ConfidenceLevel { get; set; }
        public string Description { get; set; }
        public int Type { get; set; }
        public int OwnerId { get; set; }

        public int GoalId { get; set; }
    }
}
