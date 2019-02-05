using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Repository;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[Controller]")]
    public class SkillsController : ControllerBase
    {
        private readonly ISkillsRepository _repo;

        public SkillsController(ISkillsRepository repo)
        {
            _repo = repo;
        }

        // GET: api/TechTree
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Skills>>> Get()
        {
            return new ObjectResult(await _repo.GetAllSkills());
        }

        // GET: api/TechTree/5
        [HttpGet("{id}", Name = "GetTech")]
        public async Task<ActionResult<Skills>> Get(string id)
        {
            var tech = await _repo.GetSkill(id);

            if (tech == null)
            {
                return new NotFoundResult();
            }

            return new ObjectResult(tech);
        }

        // POST: api/TechTree
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Skills skill)
        {
            await _repo.Create(skill);
            return new OkObjectResult(skill);
        }

        // DELETE: api/TechTree/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var techFromDb = await _repo.GetSkill(id);

            if (techFromDb == null)
            {
                return new NotFoundResult();
            }

            await _repo.Delete(id);
            return new OkResult();
        }
    }
}
