using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Context;
using WebApi.Models;

namespace WebApi.Repository
{
    public interface IUserRepository
    {
        // api/users
        Task<IEnumerable<User>> GetAllUsers();
        // api/users/{id}/[GET]
        Task<User> GetUser(ObjectId DBId);
        // api/users/{email}/[GET]
        Task<User> GetUserbyEmail(string email);
        // api/users/[POST]
        Task Create(User user);

        Task<IEnumerable<User>> GetAllConsultants();

        Task<bool> Update(User user);

        Task<bool> Delete(ObjectId DBId);

        Task<long> GetNextId();
        Task<bool> DeleteAllMockData();

    }
}
