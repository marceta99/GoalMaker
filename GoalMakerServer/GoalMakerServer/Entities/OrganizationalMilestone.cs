﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GoalMakerServer.Entities
{
    public class OrganizationalMilestone
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsResolved { get; set; }

        [ForeignKey("OrganizationalKeyResult")]
        public int OrganizationalKeyResultId { get; set; }
        public OrganizationalKeyResult OrganizationalKeyResult { get; set; }
    }
}
