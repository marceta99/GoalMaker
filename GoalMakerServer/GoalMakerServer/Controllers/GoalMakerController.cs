using GoalMakerServer.Data;
using GoalMakerServer.DTOS;
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
        #region GET
  
        [HttpGet("GetOrganizations")]
        public async Task<ActionResult<List<Organization>>> GetOrganizations()
        {
            var organizations = await _context.Organizations.ToListAsync();

            return Ok(organizations);
        }

        [HttpGet("GetOrganization")]
        public async Task<ActionResult<List<Organization>>> GetOrganization([FromQuery] int orgId)
        {
            var organization = await _context.Organizations.FirstOrDefaultAsync(or => or.Id == orgId); 

            return Ok(organization);
        }


        [HttpGet("GetOrganizationTeamsWithName")]
        public async Task<ActionResult<List<Team>>> GetOrganizationTeamsWithName([FromQuery] string organizationName)
        {
            var teams = await _context.Teams
                .Where(t => t.Organization.Name == organizationName)
                .Include(t => t.Organization)
                .ToListAsync();

            if (teams == null) return NotFound("there is no teams for that organization name");

            return Ok(teams); 
        }

        [HttpGet("GetOrganizationTeamsWithId")]
        public async Task<ActionResult<List<Team>>> GetOrganizationTeamsWithId([FromQuery] int organizationId)
        {
            var teams = await _context.Teams
                .Where(t => t.Organization.Id == organizationId)
                .Include(t => t.Organization)
                .ToListAsync();

            if (teams == null) return NotFound("there is no teams for that organization id");

            return Ok(teams);
        }

        [HttpGet("GetTeam")]
        public  ActionResult<Team> GetTeam([FromQuery] int teamId)
        {
            var team = _context.Teams
                .Include(t => t.Organization)
                .FirstOrDefault(t => t.Id == teamId); 

            if (team == null) return NotFound("there is no team for that team id");

            return Ok(team);
        }

        [HttpGet("GetTeamGoals")]
        public async Task<ActionResult<List<Goal>>> GetTeamGoals([FromQuery] int teamId)
        {
            var goals = await _context.Goals
                .Where(g => g.Team.Id == teamId)
                .Include(g => g.Cycle)
                .ToListAsync();

            if (goals == null) return NotFound("there is no goals for that team name");

            return Ok(goals);
        }

        [HttpGet("GetGoal")]
        public ActionResult<Goal> GetGoal([FromQuery] int goalId)
        {
            var goal = _context.Goals
                .Include(g => g.Team)
                .FirstOrDefault(g => g.Id == goalId);

            if (goal == null) return NotFound("there is no goal for that goal id");

            return Ok(goal);
        }

        [HttpGet("GetGoalKeyResults")]
        public async Task<ActionResult<List<Goal>>> GetGoalKeyResults([FromQuery] int goalId)
        {
            var keyResults = await _context.KeyResults
                .Where(kr => kr.Goal.Id == goalId)
                .Include(kr => kr.Owner)
                .ToListAsync();

            if (keyResults == null) return NotFound("there is no keyResults for that goal");

            return Ok(keyResults);
        }

        [HttpGet("GetKeyResult")]
        public ActionResult<KeyResult> GetKeyResult([FromQuery] int keyResultId)
        {
            var keyResult = _context.KeyResults
                .Include(k => k.Goal)
                .FirstOrDefault(k => k.Id == keyResultId);

            if (keyResult == null) return NotFound("there is no keyResult for that keyResult id");

            return Ok(keyResult);
        }

        [HttpGet("GetKeyResultInitiatives")]
        public async Task<ActionResult<List<Goal>>> GetKeyResultInitiatives([FromQuery] int keyResultId)
        {
            var initiatives = await _context.Initiatives
                .Where(i => i.KeyResult.Id == keyResultId)
                .Include(i=>i.Owner)
                .ToListAsync();

            if (initiatives == null) return NotFound("there is no initiatives for that keyResult");

            return Ok(initiatives);
        }

        [HttpGet("GetInitiative")]
        public ActionResult<Initiative> GetInitiative([FromQuery] int initiativeId)
        {
            var initiative = _context.Initiatives
                .Include(i => i.KeyResult)
                .FirstOrDefault(i => i.Id == initiativeId);

            if (initiative == null) return NotFound("there is no initiative for that initiative id");

            return Ok(initiative);
        }


        #endregion

        #region POST

        [HttpPost("NewOrganization")]
        public async Task<ActionResult<OrganizationDTO>> NewOrganization([FromBody] OrganizationDTO organizationDTO) 
        {
            if (organizationDTO == null) return BadRequest("bad request");

            Organization or = new Organization { Name = organizationDTO.Name };

            _context.Organizations.Add(or);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                var lastId = _context.Organizations.Max(o => o.Id);
                return Created("~api/GoalMaker/GetOrganization?orgId=" + lastId, or);
            }
            return BadRequest("problem with creating new organization "); 
        }

        [HttpPost("NewTeam")]
        public async Task<ActionResult<TeamDTO>> NewTeam([FromBody] TeamDTO teamDTO) 
        {
            if (teamDTO == null) return BadRequest("bad request");

            Team t = new Team { Name = teamDTO.Name, OrganizationId = teamDTO.OrganizationId };

            _context.Teams.Add(t);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                var lastId = _context.Teams.Max(t => t.Id);
                return Created("~api/GoalMaker/GetTeam?teamId=" + lastId, t);
            }
            return BadRequest("problem with creating new team ");
        }

        [HttpPost("NewGoal")]
        public async Task<ActionResult<TeamDTO>> NewGoal([FromBody] GoalDTO goalDTO)
        {
            if (goalDTO == null) return BadRequest("bad request");

            Goal g = new Goal
            {
                Name = goalDTO.Name,
                PercentageOfSuccess = goalDTO.PercentageOfSuccess,
                ConfidenceLevel = goalDTO.ConfidenceLevel, 
                DateCreated = DateTime.Now, 
                StartDate = goalDTO.StartDate, 
                EndDate = goalDTO.EndDate, 
                CycleId = goalDTO.CycleId, 
                TeamId = goalDTO.TeamId , 
                GoalOwnerId  = goalDTO.GoalOwnerId
            }; 

            _context.Goals.Add(g);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                var lastId = _context.Goals.Max(g => g.Id);
                return Created("~api/GoalMaker/GetGoal?goalId=" + lastId, g);
            }
            return BadRequest("problem with creating new goal ");
        }

        [HttpPost("NewKeyResult")]
        public async Task<ActionResult<KeyResultDTO>> NewKeyResult([FromBody] KeyResultDTO keyResultDTO)
        {
            if (keyResultDTO == null) return BadRequest("bad request");

           KeyResult kr = new KeyResult
            {
                Name = keyResultDTO.Name,
                PercentageOfSuccess = keyResultDTO.PercentageOfSuccess,
                ConfidenceLevel = keyResultDTO.ConfidenceLevel,
                DateCreated = DateTime.Now,
                Description = keyResultDTO.Description,
                OwnerId = keyResultDTO.OwnerId, 
                GoalId = keyResultDTO.GoalId
            };

            _context.KeyResults.Add(kr);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                var lastId = _context.KeyResults.Max(g => g.Id);
                return Created("~api/GoalMaker/GetKeyResult?keyResultId=" + lastId, kr);
            }
            return BadRequest("problem with creating new keyResult ");
        }

        [HttpPost("NewInitiative")]
        public async Task<ActionResult<InitiativeDTO>> NewInitiative([FromBody] InitiativeDTO initiativeDTO)
        {
            if (initiativeDTO == null) return BadRequest("bad request");

            Initiative i = new Initiative
            {
                Name = initiativeDTO.Name,
                Description = initiativeDTO.Description, 
                InitiativeState = initiativeDTO.InitiativeState, 
                DateCreated = DateTime.Now, 
                Comments = initiativeDTO.Comments, 
                KeyResultId = initiativeDTO.KeyResultId , 
                OwnerId = initiativeDTO.OwnerId

            };

            _context.Initiatives.Add(i);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                var lastId = _context.Initiatives.Max(g => g.Id);
                return Created("~api/GoalMaker/GetInitiative?initiativeId=" + lastId, i);
            }
            return BadRequest("problem with creating new initiative ");
        }

        //OSTALO JE DA ZA CYCLE DODAM POST, odnosno da se kreira ciklus ali o tome cu jos da popricam sa stefijem 
        #endregion
    }
}
