using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[Controller]")]
    public class UsersController : Controller
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

        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]User user)
        {
            user.UserId = await _repo.GetNextId();
            await _repo.Create(user);
            return new OkObjectResult(user);
        }

    }
}
