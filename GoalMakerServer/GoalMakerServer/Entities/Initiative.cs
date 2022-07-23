using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GoalMakerServer.Entities
{
    public class Initiative
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int InitiativeState { get; set; } //ovde kasnije da dodam Enum State 
        public DateTime DateCreated { get; set; }
        public string Comments { get; set; }

        [ForeignKey("User")]
        public int OwnerId { get; set; }
        public User Owner { get; set; }

        [ForeignKey("KeyResult")]
        public int KeyResultId { get; set; }
        public KeyResult KeyResult { get; set; }
    }
}
