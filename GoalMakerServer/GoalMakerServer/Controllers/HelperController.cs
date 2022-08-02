using GoalMakerServer.Data;
using GoalMakerServer.DTOS;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoalMakerServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelperController : ControllerBase
    {
        private readonly AppDbContext context;

        public HelperController(AppDbContext context)
        {
            this.context = context;
        }

        [HttpPut("UpdateKeyResult")]
        public async Task<ActionResult> UpdateKeyResult([FromQuery] int keyResultId, [FromBody] KeyResultDTO keyResultDTO)
        {
            if (!ModelState.IsValid) return BadRequest("bad request");

            var keyResult = context.KeyResults.FirstOrDefault(k => k.Id == keyResultId);

            if (keyResult == null) return NotFound("keyResult with that id doesn't exists");

            keyResult.Name = keyResultDTO.Name;
            keyResult.PercentageOfSuccess = keyResultDTO.PercentageOfSuccess;
            keyResult.ConfidenceLevel = keyResultDTO.ConfidenceLevel;
            keyResult.Description = keyResultDTO.Description;
            keyResult.OwnerId = keyResultDTO.OwnerId;
            //keyResult.GoalId = keyResultDTO.GoalId; nema mi logike da keyResult moze da promeni goal 

            var result = await context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok("keyResult updated");
            }
            return BadRequest("problem with updating keyResult ");

        }


    }
}
