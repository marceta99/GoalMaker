using GoalMakerServer.Data;
using GoalMakerServer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoalMakerServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoalMakerController : ControllerBase
    {
        private AppDbContext _context; 
        public GoalMakerController(AppDbContext context)
        {
            _context = context; 
        }

        [HttpGet("getOrganizations")]
        public async Task<ActionResult<List<Organization>>> GetCompanies()
        {
            var organizations = await _context.Organizations.ToListAsync();

            return Ok(organizations);
        }
        [HttpGet("getTeams")]
        public async Task<ActionResult<List<Team>>> GetTeamsForOrganization([FromQuery] string organizationName)
        {
            var teams = await _context.Teams.Where(t => t.Organization.Name == organizationName).ToListAsync();

            if (teams == null) return NotFound("there is no teams for that organization name");

            return Ok(teams); 
        }


    }
}
