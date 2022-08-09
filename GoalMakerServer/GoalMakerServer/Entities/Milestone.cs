using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GoalMakerServer.Entities
{
    public class Milestone
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsResolved { get; set; }

        [ForeignKey("User")]
        public int KeyResultId { get; set; }
        public KeyResult KeyResult { get; set; }

    }
}
