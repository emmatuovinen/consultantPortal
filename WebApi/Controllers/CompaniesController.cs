using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Repository;

namespace WebApi.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CompaniesController : ControllerBase
    {

        private readonly ICompanyRepository _repo;

        public CompaniesController(ICompanyRepository repo)
        {
            _repo = repo;
        }

        // GET: api/Companies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> Get()
        {
            return new ObjectResult(await _repo.GetAllCompanies());
        }

        // GET: api/Companies/5
        [HttpGet("{id}", Name = "GetCompany")]
        public async Task<ActionResult<IEnumerable<Company>>> Get(long id)
        {
            var company = await _repo.GetCompany(id);

            if (company == null)
            {
                return new NotFoundResult();
            }

            return new ObjectResult(company);
        }

        // POST: api/Companies
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Company company)
        {
            await _repo.Create(company);
            return new OkObjectResult(company);
        }

        // PUT: api/Companies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody]Company company)
        {
            var updatedCompany = await _repo.GetCompany(id);

            if (updatedCompany == null)
            {
                return new NotFoundResult();
            }

            updatedCompany.CompanyID = id;
            updatedCompany.CompanyName = company.CompanyName;

            await _repo.Update(updatedCompany);
            return new OkObjectResult(updatedCompany);

        }

        // DELETE: api/Companies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var company = await _repo.GetCompany(id);

            if (company == null)
            {
                return new NotFoundResult();
            }

            await _repo.Delete(id);
            return new OkResult();
        }
    }
}
