using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoalMakerServer.DTOS.PostPutDTOS
{
    public class PPTeamDTO
    {
        public string Name { get; set; }
        public string TeamCountry { get; set; }
        public int PercentageOfSuccess { get; set; }
        public int ConfidenceLevel { get; set; }
    }
}
