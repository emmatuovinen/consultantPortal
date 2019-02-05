using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Repository
{
    public interface ITechTreeRepository
    {
        Task<IEnumerable<TechTree>> GetAllTechs();

        Task<TechTree> GetTech(string _id);

        Task Create(TechTree tech);

        Task<bool> Delete(string _id);

    }
}
