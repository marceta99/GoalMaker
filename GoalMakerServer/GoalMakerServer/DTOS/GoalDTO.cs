﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoalMakerServer.DTOS
{
    public class GoalDTO
    {
        public string Name { get; set; }
        public int PercentageOfSuccess { get; set; }
        public int ConfidenceLevel { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int GoalOwnerId { get; set; }
        public int TeamId { get; set; }
        public int CycleId { get; set; }
    }
}
