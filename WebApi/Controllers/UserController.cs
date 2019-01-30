using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Context;
using WebApi.Models;
using WebApi.Repository;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[Controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repo;

        public UsersController(IUserRepository repo)
        {
            _repo = repo;
        }

        //GET api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return new ObjectResult(await _repo.GetAllUsers());
        }

        // GET api/users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(long id)
        {
            var user = await _repo.GetUser(id);

            if (user == null)
            {
                return new NotFoundResult();
            }

            return new ObjectResult(user);
        }
        // GET api/users/consultants
        [HttpGet, Route("consultants")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllConsultants()
        {
            return new ObjectResult(await _repo.GetAllConsultants());
        }

        // POST: api/users
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]User user)
        {
            user.UserId = await _repo.GetNextId();
            await _repo.Create(user);
            return new OkObjectResult(user);
        }

        // PUT: api/users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody]User user)
        {
            var updatedUser = await _repo.GetUser(id);

            if (updatedUser == null)
            {
                return new NotFoundResult();
            }

            updatedUser.UserId = id;

            updatedUser.FirstName = user.FirstName;
            updatedUser.LastName = user.LastName;
            updatedUser.Role = user.Role;
            updatedUser.Email = user.Email;
            updatedUser.PhoneNumber = user.PhoneNumber;
            updatedUser.Description = user.Description;


            await _repo.Update(updatedUser);

            return new OkObjectResult(updatedUser);

        }

        //DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var userFromDb = await _repo.GetUser(id);

            if (userFromDb == null)
            {
                return new NotFoundResult();
            }

            await _repo.Delete(id);

            return new OkResult();
        }

    }
}
