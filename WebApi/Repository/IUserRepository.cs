using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Context;

namespace WebApi.Repository
{
    public interface IUserRepository
    {
        // api/[GET]
        Task<IEnumerable<User>> GetAllUsers();
        // api/{id}/[GET]
        Task<User> GetUser(long id);
        // api/[POST]
        Task Create(User user);

        Task<bool> Update(User user);

        Task<bool> Delete(long id);

        Task<long> GetNextId();

        Task<bool> DeleteAll();
    }
}
