using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using WebApi.Repository;

namespace WebApi.Models
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PositionsController : ControllerBase
    {
        private readonly IPositionRepository _repo;

        public PositionsController(IPositionRepository repo)
        {
            _repo = repo;
        }

        // GET: api/Positions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Position>>> Get()
        {
            return new ObjectResult(await _repo.GetAllPositions());
        }

        [HttpGet, Route("GetActivePositions")]
        public async Task<ActionResult<IEnumerable<Position>>> GetActivePositions()
        {
            return new ObjectResult(await _repo.GetActivePositions());
        }

        // GET: api/Positions/5
        [HttpGet("{_id}", Name = "GetPosition")]
        public async Task<ActionResult<Position>> Get(string _id)
        {
            var position = await _repo.GetPosition(_id);

            if (position == null)
            {
                return new NotFoundResult();
            }



            return new ObjectResult(position);
        }

        // POST: api/Positions
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Position position)
        {
            await _repo.Create(position);
            return new OkObjectResult(position);
        }

        // PUT: api/Positions/5
        [HttpPut("{_id}")]
        public async Task<IActionResult> Put(string _id, [FromBody]Position position)
        {

            var updatedPosition = await _repo.GetPosition(_id);

            if (position == null)
            {
                return new NotFoundResult();
            }

            updatedPosition.Company = position.Company;
            updatedPosition.PositionRole = position.PositionRole;
            updatedPosition.Location = position.Location;
            updatedPosition.PositionDescription = position.PositionDescription;
            updatedPosition.IsActive = position.IsActive;
            updatedPosition.PositionStatus = position.PositionStatus;
            updatedPosition.PositionSkills = new List<string>();
            foreach (var item in position.PositionSkills)
            {
                updatedPosition.PositionSkills.Add(item);
            }

            await _repo.Update(updatedPosition);

            return new OkObjectResult(updatedPosition);
        }

        //DELETE: /Positions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var userFromDb = await _repo.GetPosition(id);

            if (userFromDb == null)
            {
                return new NotFoundResult();
            }

            await _repo.Delete(id);

            return new OkResult();
        }
    }
}
