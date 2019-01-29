using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Context;
using WebApi.Repository;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MockDataController : ControllerBase
    {

        private readonly IUserRepository _repo;

        public MockDataController(IUserRepository repo)
        {
            _repo = repo;
        }

        // POST: api/MockData
        [HttpPost("{howMany}")]
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
                    UserId = await _repo.GetNextId(),
                    FirstName = "Testi" + i,
                    LastName = "Testaaja" + i,
                    Role = "MockRole",
                    Email = "pekka" + i + "@hotmail.com",
                    PhoneNumber = "05012345" + i,
                    Description = "But of aisle venerable and one fabled scorching his spent honeyed them his his nor he een had and a"
                };
                await _repo.Create(user);
            }

            return Ok("Mock data created");
        }

        // DELETE: api/MockData/key
        [HttpDelete("{key}")]
        public void Delete(string key)
        {
            if (key == "remove")
            {
                _repo.DeleteAllMockData();
            }
        }
    }
}
