using GoalMakerServer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoalMakerServer.DTOS
{
    public class TeamDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int OrganizationId { get; set; }
        public User Owner { get; set; }
        public double PercentageOfSuccess { get; set; }
        public int ConfidenceLevel { get; set; }
        public string TeamCountry { get; set; }

    }
}
