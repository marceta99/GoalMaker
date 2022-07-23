using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoalMakerServer.DTOS
{
    public class InitiativeDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int InitiativeState { get; set; } //ovde kasnije da dodam Enum State 
        public string Comments { get; set; }

        public int OwnerId { get; set; }

        public int KeyResultId { get; set; }








    }
}
