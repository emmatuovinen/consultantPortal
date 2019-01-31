using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Context;
using WebApi.Models;
using WebApi.Repository;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MockDataController : ControllerBase
    {

        private readonly IUserRepository _userRepo;
        private readonly ITechTreeRepository _techRepo;

        public MockDataController(IUserRepository user, ITechTreeRepository tech)
        {
            _userRepo = user;
            _techRepo = tech;
        }

        // POST: api/MockData
        [HttpPost("{howMany}"), Route("users")]
        public async Task<IActionResult> CreateUsers(int howMany)
        {
            if (howMany > 50)
            {
                return BadRequest("Only under 50 allowed");
            }

            for (int i = 0; i < howMany; i++)
            {
                var user = new User
                {
                    UserId = await _userRepo.GetNextId(),
                    FirstName = "Testi" + i,
                    LastName = "Testaaja" + i,
                    Role = "MockRole",
                    Email = "pekka" + i + "@hotmail.com",
                    PhoneNumber = "05012345" + i,
                    IsDemoData = true,
                    Description = "But of aisle venerable and one fabled scorching his spent honeyed them his his nor he een had and a"
                };
                await _userRepo.Create(user);
                user = new User
                {
                    UserId = await _userRepo.GetNextId(),
                    FirstName = "Consult" + i,
                    LastName = "Konsultti" + i,
                    Role = "Consult",
                    Email = "Consult" + i + "@hotmail.com",
                    PhoneNumber = "04012345" + i,
                    IsDemoData = true,
                    Description = "These did fall thence given hight ungodly any his talethis aye before fondly scene pangs sight done uses fall left me will in of woe of or mood in name name whateer virtues girls did by time heart way from some go his bacchanals his is the thou the like"
                };
                await _userRepo.Create(user);
            }

            return Ok("Mock users created");
        }

        // DELETE: api/MockData/key
        [HttpDelete("{key}"), Route("users")]
        public void Delete(string key)
        {
            if (key == "remove")
            {
                _userRepo.DeleteAllMockData();
            }
        }

        [HttpPost, Route("CreateTech")]
        public async Task<IActionResult> CreateTech()
        {
            for (int i = 0; i < 10; i++)
            {
                var tech = new TechTree
                {
                    TechId = await _techRepo.GetNextId(),
                    Tech = "tech" + i,
                };

                await _techRepo.Create(tech);
            }

            return Ok("Mock tech's created");
        }
    }
}
