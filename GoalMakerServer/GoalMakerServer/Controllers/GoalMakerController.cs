﻿using GoalMakerServer.Data;
using GoalMakerServer.DTOS;
using GoalMakerServer.DTOS.PostPutDTOS;
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
        public async Task<ActionResult<List<TeamDTO>>> GetOrganizationTeamsWithId([FromQuery] int organizationId)
        {
            var teams = await _context.Teams
                .Where(t => t.Organization.Id == organizationId)
                .Include(t => t.Organization)
                .ToListAsync();

            if (teams == null) return NotFound("there is no teams for that organization id");

            List<TeamDTO> teamsDto = new List<TeamDTO>(); 

            foreach(Team t in teams)
            {
                TeamDTO tdo = new TeamDTO { Name = t.Name, OrganizationId = t.OrganizationId,
                                            TeamCountry = t.TeamCountry, ConfidenceLevel = t.ConfidenceLevel, 
                                            PercentageOfSuccess = t.PercentageOfSuccess, Id = t.Id};
                tdo.Owner = GetTeamOwnerPrivate(t.Id);
                teamsDto.Add(tdo); 
            }
            return Ok(teamsDto);
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

        [HttpGet("GetTeamOwner")]
        public ActionResult<User> GetTeamOwner([FromQuery]int teamId)
        {
            var teamOwner = _context.TeamsUsers
                .Include(tm => tm.Member)
                .FirstOrDefault(tm => (tm.TeamId == teamId && tm.IsOwner == true) );

            if (teamOwner == null) return NotFound("there is no teamOwner for that team id");

            return Ok(teamOwner.Member);
        }

        private User GetTeamOwnerPrivate(int teamId)
        {
            var teamOwner = _context.TeamsUsers
               .Include(tm => tm.Member)
               .FirstOrDefault(tm => (tm.TeamId == teamId && tm.IsOwner == true));

            if (teamOwner == null) return null; 
            var owner = teamOwner.Member;

            return owner; 
        }

        [HttpGet("GetTeamGoals")]
        public async Task<ActionResult<List<Goal>>> GetTeamGoals([FromQuery] int teamId)
        {
            var goals = await _context.Goals
                .Where(g => g.Team.Id == teamId)
                .Include(g => g.Cycle)
                .Include(g => g.GoalOwner)
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
        public async Task<ActionResult<TeamDTO>> NewTeam([FromQuery]int organizationId,[FromBody] PPTeamDTO teamDTO) 
        {
            if (teamDTO == null) return BadRequest("bad request");

            Team t = new Team { Name = teamDTO.Name, OrganizationId = organizationId, 
                ConfidenceLevel = teamDTO.ConfidenceLevel, PercentageOfSuccess = teamDTO.PercentageOfSuccess ,
                TeamCountry = teamDTO.TeamCountry};

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

        #region PUT

        [HttpPut("UpdateOrganization")]
        public async Task<ActionResult> UpdateOrganization([FromQuery] int organizationId,[FromBody]OrganizationDTO organizationDTO) 
        {
            if (!ModelState.IsValid) return BadRequest("bad request");

            var organization = _context.Organizations.FirstOrDefault(o => o.Id == organizationId);

            if (organization == null) return NotFound("Organization with that id doesn't exists");

            organization.Name = organizationDTO.Name;

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok("organization updated"); 
            }
            return BadRequest("problem with updating organization ");

        }

        [HttpPut("UpdateTeam")]
        public async Task<ActionResult> UpdateTeam([FromQuery] int teamId, [FromBody] PPTeamDTO teamDTO)
        {
            if (!ModelState.IsValid) return BadRequest("bad request");

            var team = _context.Teams.FirstOrDefault(t => t.Id == teamId);

            if (team == null) return NotFound("Team with that id doesn't exists");

            team.Name = teamDTO.Name;
            team.TeamCountry = teamDTO.TeamCountry;
            team.ConfidenceLevel = teamDTO.ConfidenceLevel;
            team.PercentageOfSuccess = teamDTO.PercentageOfSuccess; 
            //team.OrganizationId = teamDTO.OrganizationId; ovo sam namerno zakomentarisao jer mi je nelogicno da timovi
            //mogu da promene organizaciju i zato to ovde ne radim.tako da ako je tim u jednoj org, tu ce i ostati

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok("team updated");
            }
            return BadRequest("problem with updating team ");

        }

        [HttpPut("UpdateGoal")]
        public async Task<ActionResult> UpdateGoal([FromQuery] int goalId, [FromBody] GoalDTO goalDTO)
        {
            if (!ModelState.IsValid) return BadRequest("bad request");

            var goal = _context.Goals.FirstOrDefault(g => g.Id == goalId);

            if (goal == null) return NotFound("goal with that id doesn't exists");

            goal.Name = goalDTO.Name;
            goal.PercentageOfSuccess = goalDTO.PercentageOfSuccess;
            goal.ConfidenceLevel = goalDTO.ConfidenceLevel;
            goal.StartDate = goalDTO.StartDate;
            goal.EndDate = goalDTO.EndDate;
            goal.GoalOwnerId = goalDTO.GoalOwnerId;
            //goal.TeamId = goalDTO.TeamId; ovo mi je isto nelogicno da goal promeni tim 
            goal.CycleId = goalDTO.CycleId;  

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok("goal updated");
            }
            return BadRequest("problem with updating goal ");

        }

        [HttpPut("UpdateKeyResult")]
        public async Task<ActionResult> UpdateKeyResult([FromQuery] int keyResultId, [FromBody] KeyResultDTO keyResultDTO)
        {
            if (!ModelState.IsValid) return BadRequest("bad request");

            var keyResult = _context.KeyResults.FirstOrDefault(k => k.Id == keyResultId);

            if (keyResult == null) return NotFound("keyResult with that id doesn't exists");

            keyResult.Name = keyResultDTO.Name;
            keyResult.PercentageOfSuccess = keyResultDTO.PercentageOfSuccess;
            keyResult.ConfidenceLevel = keyResultDTO.ConfidenceLevel;
            keyResult.Description = keyResultDTO.Description;
            keyResult.OwnerId = keyResultDTO.OwnerId;
            //keyResult.GoalId = keyResultDTO.GoalId; nema mi logike da keyResult moze da promeni goal 

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok("keyResult updated");
            }
            return BadRequest("problem with updating keyResult ");

        }

        [HttpPut("UpdateInitiative")]
        public async Task<ActionResult> UpdateInitiative([FromQuery] int initiativeId,[FromBody] InitiativeDTO initiativeDTO)
        {
            if (!ModelState.IsValid) return BadRequest("bad request");

            var initiative = _context.Initiatives.FirstOrDefault(i => i.Id == initiativeId);

            if (initiative == null) return NotFound("initiative with that id doesn't exists");

            initiative.Name = initiativeDTO.Name;
            initiative.Description = initiativeDTO.Description;
            initiative.InitiativeState = initiativeDTO.InitiativeState;
            initiative.Comments = initiativeDTO.Comments;
            initiative.OwnerId = initiativeDTO.OwnerId;
            //initiative.KeyResultId = initiativeDTO.KeyResultId; nema logike da se promeni key result 

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok("initiative updated");
            }
            return BadRequest("problem with updating initiative ");

        }

        #endregion

        #region DELETE

        [HttpDelete("DeleteOrganization")]
        public async Task<ActionResult> DeleteOrganization([FromQuery] int organizationId)
        {
            var organization = _context.Organizations.FirstOrDefault(o => o.Id == organizationId);

            if (organization == null) return NotFound("Organization with that id doesn't exists");

            var teams = await _context.Teams
                .Where(t => t.OrganizationId == organization.Id)
                .ToListAsync();



            foreach (Team t in teams)
            {
                await deleteGoalHelper(t);
            }

            _context.Teams.RemoveRange(teams);

            _context.Organizations.Remove(organization);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok("organization deleted");
            }
            return BadRequest("problem with deleting organization ");
        }

        [HttpDelete("DeleteTeam")]
        public async Task<ActionResult> DeleteTeam([FromQuery] int teamId)
        {
            var team = _context.Teams.FirstOrDefault(t => t.Id == teamId);

            if (team == null) return NotFound("team with that id doesn't exists");

            await deleteGoalHelper(team);

            _context.Teams.Remove(team); 

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok("team deleted");
            }
            return BadRequest("problem with deleting team ");
        }

        [HttpDelete("DeleteGoal")]
        public async Task<ActionResult> DeleteGoal([FromQuery] int goalId)
        {
            var goal = _context.Goals.FirstOrDefault(g => g.Id == goalId);

            if (goal == null) return NotFound("goal with that id doesn't exists");

            await DeleteKeyValueHelper(goal);

            _context.Goals.Remove(goal);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok("goal deleted");
            }
            return BadRequest("problem with deleting goal");
        }

        [HttpDelete("DeleteKeyResult")]
        public async Task<ActionResult> DeleteKeyResult([FromQuery] int keyResultId)
        {
            var keyResult = _context.KeyResults.FirstOrDefault(k => k.Id == keyResultId);

            if (keyResult == null) return NotFound("keyResult with that id doesn't exists");

            await DeleteInitiativeHelper(keyResult); 

            _context.KeyResults.Remove(keyResult);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok("keyResult deleted");
            }
            return BadRequest("problem with deleting keyResult");
        }

        [HttpDelete("DeleteInitiative")]
        public async Task<ActionResult> DeleteInitiative([FromQuery] int initiativeId)
        {
            var initiative = _context.Initiatives.FirstOrDefault(i => i.Id == initiativeId);

            if (initiative == null) return NotFound("initiative with that id doesn't exists");

            _context.Initiatives.Remove(initiative);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok("initiative deleted");
            }
            return BadRequest("problem with deleting initiative");
        }

        private async Task deleteGoalHelper(Team team) {
            var goals = await _context.Goals
                .Where(g => g.TeamId == team.Id)
                .ToListAsync();

            foreach (Goal g in goals) {
                await DeleteKeyValueHelper(g); 
            }
            _context.Goals.RemoveRange(goals);
        }
        private async Task DeleteKeyValueHelper(Goal goal)
        {
            var keyResults = await _context.KeyResults
                            .Where(k => k.GoalId == goal.Id)
                            .ToListAsync();

            foreach(KeyResult k in keyResults)
            {
                await DeleteInitiativeHelper(k);
            }
            _context.KeyResults.RemoveRange(keyResults);

        }

        private async Task DeleteInitiativeHelper(KeyResult keyResult)
        {
            var initiatives = await _context.Initiatives
                                .Where(i => i.KeyResultId == keyResult.Id)
                                .ToListAsync();

            _context.Initiatives.RemoveRange(initiatives);
        }

        #endregion

        #region PATCH
        #endregion
    }
}
