﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GoalMakerServer.Entities
{
    public class KeyResult
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int PercentageOfSuccess { get; set; }
        public int ConfidenceLevel { get; set; }
        public DateTime DateCreated { get; set; }
        public string Description { get; set; }

        public List<Initiative> Initiatives { get; set; }

        [ForeignKey("User")]
        public int OwnerId { get; set; }
        public User Owner { get; set; }

        [ForeignKey("Goal")]
        public int GoalId { get; set; }
        public Goal Goal { get; set; }
    }
}
