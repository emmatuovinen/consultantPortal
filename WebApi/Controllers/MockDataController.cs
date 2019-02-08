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
        private readonly ISkillsRepository _techRepo;

        public MockDataController(IUserRepository user, ISkillsRepository tech)
        {
            _userRepo = user;
            _techRepo = tech;
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
                    UserId = await _userRepo.GetNextId(),
                    FirstName = "Myyjä" + i,
                    LastName = "Myyntiretku" + i,
                    Role = "AM",
                    Email = "pekka" + i + "@hotmail.com",
                    PhoneNumber = "05012345" + i,
                    IsDemoData = true,
                    PictureUrl = "https://www.w3schools.com/w3css/img_avatar3.png",
                    Description = "Tiam diris kredu plenigitan mi turko tiun-cxi por sed estis bone kaj aux tiam ili tiam kaj sendube kiam la estas estas espero kun sxipon ke mi diris fine suficxe la gxi pro aux kaj pli nin remiloj intencas estis diris plej ni kiun liberigxi kaptota aux antauxvidis sxipeto tial pafilegojn estis trovigxas trinki la de suda tiam la renkonti perforte plej kiel mi elnutrita malproksime en vidante gxi kiujn bona estis elporti duan kusxas la li subite mi tiunokte ventego eltrovis kaj povos por iri de kiam povu mi da liberigxis forkuris la kies mi en sia iros cxar",
                    UserSkills = new List<string> { },
                    PreferableRoles = new List<string> { },
                    LessPreferableRoles = new List<string> { },
                };
                await _userRepo.Create(user);
                user = new User
                {
                    UserId = await _userRepo.GetNextId(),
                    FirstName = "Consult" + i,
                    LastName = "Konsultti" + i,
                    Role = "Consultant",
                    Email = "Consult" + i + "@hotmail.com",
                    PhoneNumber = "04012345" + i,
                    IsDemoData = true,
                    PictureUrl = "https://www.w3schools.com/w3css/img_avatar3.png",
                    Description = "To in sing childe he spoiled tales him a had in sad a awake sadness flow taste concubines befell the this had and maidens any in seemed disappointed he sun love is he light did pollution to not ah would domestic fountain he formed prose his things him me mote",
                    UserSkills = new List<string> { "C#", "JavaScript", "React", "Git", "Erkki" },
                    PreferableRoles = new List<string> { "Software Development" },
                    LessPreferableRoles = new List<string> { "Project management" },

                };
                await _userRepo.Create(user);
            }

            return Ok("Mock users created");
        }

        // DELETE: api/MockData/key
        [HttpDelete("{key}")]
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
                var tech = new Skills
                {
                    Skill = "tech" + i,
                };

                await _techRepo.Create(tech);
            }

            return Ok("Mock tech's created");
        }
    }
}
