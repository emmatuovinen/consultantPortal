using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Repository
{
    public interface ISkillsRepository
    {
        Task<IEnumerable<Skills>> GetAllSkills();

        Task<Skills> GetSkill(string _id);

        Task Create(Skills tech);

        Task<bool> Delete(string _id);

    }
}
