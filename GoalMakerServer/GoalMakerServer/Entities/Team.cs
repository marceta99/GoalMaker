using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GoalMakerServer.Entities
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int PercentageOfSuccess { get; set; }
        public int ConfidenceLevel { get; set; }
        public string TeamCountry { get; set; }

        [ForeignKey("Organization")]
        public int OrganizationId { get; set; }
        public Organization Organization { get; set; }

    }
}
