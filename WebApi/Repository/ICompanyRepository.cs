using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Repository
{
    public interface ICompanyRepository
    {
        Task<IEnumerable<Company>> GetAllCompanies();

        Task<Company> GetCompany(long id);

        Task Create(Company company);

        Task<bool> Delete(long id);

        Task<bool> Update(Company company);


    }
}
