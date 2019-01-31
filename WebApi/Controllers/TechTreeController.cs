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
    public class TechTreeController : ControllerBase
    {
        private readonly ITechTreeRepository _repo;

        public TechTreeController(ITechTreeRepository repo)
        {
            _repo = repo;
        }

        // GET: api/TechTree
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TechTree>>> Get()
        {
            return new ObjectResult(await _repo.GetAllTechs());
        }

        // GET: api/TechTree/5
        [HttpGet("{id}", Name = "GetTech")]
        public async Task<ActionResult<TechTree>> Get(long id)
        {
            var tech = await _repo.GetTech(id);

            if (tech == null)
            {
                return new NotFoundResult();
            }

            return new ObjectResult(tech);
        }

        // POST: api/TechTree
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TechTree techTree)
        {
            techTree.TechId = await _repo.GetNextId();
            await _repo.Create(techTree);
            return new OkObjectResult(techTree);
        }

        // DELETE: api/TechTree/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var techFromDb = await _repo.GetTech(id);

            if (techFromDb == null)
            {
                return new NotFoundResult();
            }

            await _repo.Delete(id);
            return new OkResult();
        }
    }
}
