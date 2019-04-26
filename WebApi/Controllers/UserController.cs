using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Context;
using WebApi.Models;
using WebApi.Repository;

namespace WebApi.Controllers
{
    //[Authorize]
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
        [HttpGet("{dbId}", Name = "GetUser")]
        public async Task<ActionResult<User>> Get(ObjectId dbId)
        {
            var user = await _repo.GetUser(dbId);

            if (user == null)
            {
                return new NotFoundResult();
            }

            return new ObjectResult(user);
        }

        //// GET api/users/{email}
        //[HttpGet("{email}", Name = "GetUserbyEmail")]
        //public async Task<ActionResult<User>> GetUserbyEmail(string email)
        //{
        //    var user = await _repo.GetUserbyEmail(email);

        //    if (user == null)
        //    {
        //        return new NotFoundResult();
        //    }

        //    return new ObjectResult(user);
        //}

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
        public async Task<IActionResult> Put(ObjectId DBId, [FromBody]User user)
        {
            var updatedUser = await _repo.GetUser(DBId);

            if (updatedUser == null)
            {
                return new NotFoundResult();
            }

            //updatedUser.DBId = DBId;

            updatedUser.FirstName = user.FirstName;
            updatedUser.LastName = user.LastName;
            updatedUser.Role = user.Role;
            updatedUser.Email = user.Email;
            updatedUser.PhoneNumber = user.PhoneNumber;
            updatedUser.Description = user.Description;
            updatedUser.LinkedInUrl = user.LinkedInUrl;
            updatedUser.GitHubUrl = user.GitHubUrl;
            updatedUser.PictureUrl = user.PictureUrl;
            updatedUser.UserSkills = new List<string>();
            foreach (var item in user.UserSkills)
            {
                updatedUser.UserSkills.Add(item);
            }
            updatedUser.PreferableRoles = new List<string>();
            foreach (var item in user.PreferableRoles)
            {
                updatedUser.PreferableRoles.Add(item);
            }
            updatedUser.LessPreferableRoles = new List<string>();
            foreach (var item in user.LessPreferableRoles)
            {
                updatedUser.LessPreferableRoles.Add(item);
            }


            await _repo.Update(updatedUser);

            return new OkObjectResult(updatedUser);

        }

        //DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(ObjectId DBId)
        {
            var userFromDb = await _repo.GetUser(DBId);

            if (userFromDb == null)
            {
                return new NotFoundResult();
            }

            await _repo.Delete(DBId);

            return new OkResult();
        }

    }
}
