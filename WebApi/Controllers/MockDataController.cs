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

        [HttpPost]
        public async Task<IActionResult> CreateDemoUsers()
        {
            var usersList = new List<User>()
            {
                new User()
                {
                    UserId = 1,
                    FirstName = "Essi", LastName = "Lehtola",
                    Role = "Consultant", Email = "essi.lehtola@hotmail.com ",
                    PhoneNumber = "0401234567",
                    IsDemoData = true,
                    PictureUrl = "https://uploads-ssl.webflow.com/5a9d2249a2f0dc0001b64dcd/5bb1c8debf4265068fad63b6_Essi%20Lehtola.png",
                    UserSkills = new List<string> { "C#", ".NET", "React", "HTML5", "Node.js", "JavaScript", "jQuery", "MVC", "REST API", "Azure", "Scrum", "UX", "Git" },
                    PreferableRoles = new List<string> { "Full stack developer", "Website related roles","Mobile development" },
                    LessPreferableRoles = new List<string> { "Roles that don't include any coding", "Project manager", "Pure DevOps","Data analytics" },
                    Description = "Essi on kunnianhimoinen ja ahkera persoona, jonka vahvuuksiin kuuluvat positiivisuus, visuaalisuus ja asiakaspalvelu. Tarkka ja ongelmanratkaisukeskeinen Essi on vastannut useista projekteista ja ollut pidetty henkilö kaikissa tiimeissään. Koska työnteko on tärkeä osa Essin elämää, hänelle on tärkeää hoitaa työnsä hyvin ja myös viihtyä työssään. Nopeasti oppiva Essi otti jo kerran haltuun täysin uuden alan ja seuraava tavoite on olla it-alan rautainen ammattilainen. Hän kiinnostui ohjelmoinnista työskennellessään läheisesti koodareiden kanssa mm. nettikasinosivustojen ja -sovellusten parissa.",

                },
                 new User()
                {
                    UserId = 2,
                    FirstName = "Jouni", LastName = "Nieminen",
                    Role = "Consultant", Email = "jouni.nieminen@outlook.com",
                    PhoneNumber = "0400488182",
                    IsDemoData = true,
                    PictureUrl = "https://uploads-ssl.webflow.com/5a9d2249a2f0dc0001b64dcd/5bb1c90cbf4265b02dad63bd_Jouni%20Nieminen.png",
                    UserSkills = new List<string> { "C#", ".NET", "ASP.NET", "JavaScript", "React", "React Native", "Xamarin", "Azure", "SQL", "MongoDB", "Docker", "HTML", "CSS",  "REST API", "Scrum", "Git", },
                    PreferableRoles = new List<string> { "Software Development", "Backend","Frontend","Mobile development" },
                    LessPreferableRoles = new List<string> { "Roles that don't include coding", "Project management" },
                    Description = "Jouni on sosiaalinen ja itseltään paljon vaativa tiimipelaaja, jota ajaa eteenpäin haasteet ja itsensä kehittäminen. Hän on aikaisemmin työskennellyt B2B myynnissä operaattorituotteiden parissa ja omaa vahvan kokemuksen asiakashallinnasta, käyttöönottokoulutuksesta ja esiintymisestä. Halu oppia uutta ja vanha mielenkiinto ohjelmointiin ajoi hänet alan vaihtoon. Omat projektit, onnistumiset ongelmatilanteissa ja jatkuva harjoittelu ajavat häntä kehittymään. Omassa yrityksessä aloitettu projekti ja sen muokkaaminen asiakkaille sopivaksi toimi sykäyksenä siirtyä myynnistä ohjelmointiin.",

                },
                  new User()
                {
                    UserId = 3,
                    FirstName = "Arttu", LastName = "Kailanto",
                    Role = "Consultant", Email = "arttukailanto@gmail.com ",
                    PhoneNumber = "0401234567",
                    IsDemoData = true,
                    PictureUrl = "https://uploads-ssl.webflow.com/5a9d2249a2f0dc0001b64dcd/5bb1c7412ec3053ba4680de1_Arttu%20Kailanto.png",
                    UserSkills = new List<string> { "Scrum", "React", "AWS serverless", "Azure", "GIT", "HTML", "CSS", "Javascript", "C# (.NET)", "SQL", },
                    PreferableRoles = new List<string> { "Business development", "Project management", "Cloud","Front-end" },
                    LessPreferableRoles = new List<string> { "Roles that only include coding" },
                    Description = "Arttu on kommunikointitaitoinen tiimipelaaja, joka motivoituu haasteista ja hänellä on erinomaiset ongelmanratkaisutaidot. Ennen IT-alalle siirtymistä, Arttu opiskeli itsensä kauppatieteiden maisteriksi kansainvälisen markkinoinnin johtamisessa. Arttu on työskennellyt start-upeissa strategisena johtajana ja digitalisaatioprojektien vetäjänä. Arttua kiinnostaa erityisesti yritysten kasvu digitalisaation avulla, mikä kannusti häntä oppimaan lisää IT-alasta.",

                },
                   new User()
                {
                    UserId = 4,
                    FirstName = "Emma", LastName = "Tuovinen",
                    Role = "Consultant", Email = "emma.n.tuovinen@gmail.com ",
                    PhoneNumber = "0401234567",
                    IsDemoData = true,
                    PictureUrl = "",
                    UserSkills = new List<string> { "C#", "JavaScript", "React", "AWS serverless", "Git", "SQL", "Azure", "HTML", "CSS", "ASP.NET", "REST API", "Scrum", },
                    PreferableRoles = new List<string> { "Front-end roles with React", "DevOps (AWS, Azure)", "Database", "Backend" },
                    LessPreferableRoles = new List<string> { "Roles that won't include coding", "Project management" },
                    Description = "Emma on alunperin ammatiltaan kieltenopettaja ja erittäin kokenut asiakaspalvelija. Koulumaailman lisäksi hän on työskennellyt mm. mobiilioperaattoreiden palveluksessa, sekä hetken myös pankkialalla. Itsensä kehittäminen ja uuden oppiminen ovat aina olleet Emmalle tärkeitä arvoja ja kiehtova, uusi haaste teknologia-alalla on nyt muuttumassa todeksi. Hän innostui koodaamisesta vuosi sitten perehdyttyään koulumaailmassa robotiikan ja koodauksen alkeisiin, sekä tavattuaan inspiroivia koodareita. Heidän innoittaminaan hän päätyi opettelemaan web-ohjelmointia itsenäisesti verkkokursseilla.",

                },
                    new User()
                {
                    UserId = 5,
                    FirstName = "Roosa", LastName = "Tähkiö",
                    Role = "Consultant", Email = "roosa.tahkio@outlook.com",
                    PhoneNumber = "0401234567",
                    IsDemoData = true,
                    PictureUrl = "https://uploads-ssl.webflow.com/5a9d2249a2f0dc0001b64dcd/5bb1cedf2ec3054002680e04_Roosa%20Ta%CC%88hkio%CC%88.png",
                    UserSkills = new List<string> { "React", "Javascript", "CSS", "Bootstrap 4", "HTML", "Java", "Spring", "Scrum", "UX-wireframe design", "logo design", },
                    PreferableRoles = new List<string> { "UI & UX design", "graphic design", "Frontend", },
                    LessPreferableRoles = new List<string> { "Backend + databases", "Project management","devOps", "Roles that don't include coding" },
                    Description = "Roosa on määrätietoinen, työtä pelkäämätön ja uusista oivalluksista syttyvä sosiaalinen persoona. Hän on ennen alan vaihtoa toiminut laaja-alaisesti hius- ja muotialalla sekä luontaistuotteiden parissa. Luova kekseliäisyyys, diplomaattinen lähestymistapa ja organisointikyky ovat Roosan valttikortteja työelämässä. Roosalla on vahva visuaalinen silmä ja aito halu vaikuttaa asioihin. Hän on luonut laadukkaaseen palveluun perustuvia vakituisia asiakassuhteita menestyksekkäästi ja on kokenut myyjä sekä aktiivinen tiimin jäsen. Kipinä alanvaihtoon syttyi seuratessa alalla työskenteleviä läheisiä.",

                },
                     new User()
                {
                    UserId = 6,
                    FirstName = "Aino", LastName = "Rouvinen",
                    Role = "Consultant", Email = "aino.rouvinen@outlook.com",
                    PhoneNumber = "0401234567",
                    IsDemoData = true,
                    PictureUrl = "https://uploads-ssl.webflow.com/5a9d2249a2f0dc0001b64dcd/5bb1c697e22faff839a2cebb_Aino%20Rouvinen.png",
                    UserSkills = new List<string> { "C#", "Javascript", "React", "GIT",  "HTML", "CSS", "Python", "Scrum", "AWS serverless", "ASP.NET", "Azure", "REST API", "SQL", },
                    PreferableRoles = new List<string> { "Frontend", "Creating new applications", "UI/UX", "AI/Machine Learning" },
                    LessPreferableRoles = new List<string> { "Roles that won't include coding", "Backend" },
                    Description = "Aino on innovatiivinen ideanikkari, joka syttyy ongelmanratkaisusta. Hän kokee yhdessä tekemisen ja palvelumuotoilun oleellisena osana kehitystyötä. Ainon kiinnostusta ohjelmointiin ovat ruokkineet projektit pelialan parissa, etenkin installaatio Heurekaan, jossa hän vastasi visuaalisesta ilmeestä. Siinä tutkittiin jo olemassa olevan teknologian käyttöliittymän uusia mahdollisuuksia ja käyttötapoja. Aino on työskennellyt luovalla alalla graafisena- ja konseptisuunnittelijana sekä peligraafikkona. Aino omaa erinomaiset vuorovaikutustaidot ja halun tuottaa erinomaisia käyttäjäkokemuksia.",

                },
            };

            foreach (var item in usersList)
            {
                await _userRepo.Create(item);
            }

            return Ok("Demo users created");

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
