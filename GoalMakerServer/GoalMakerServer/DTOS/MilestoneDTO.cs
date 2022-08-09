using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoalMakerServer.DTOS
{
    public class MilestoneDTO
    {
        public string Name { get; set; }
        public bool IsResolved { get; set; }
        public int KeyResultId { get; set; }
    }
}
