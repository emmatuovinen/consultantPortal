using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public interface IUserRepository
    {
        // api/[GET]
        Task<IEnumerable<User>> GetAllUsers();
        // api/{id}/[GET]
        Task<User> GetUser(long id);
        // api/[POST]
        Task Create(User user);

        Task<long> GetNextId();
    }
}
