using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class UserRepository : IUserRepository
    {
        private readonly IUserContext _context;

        public UserRepository(IUserContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _context
                        .Users
                        .Find(_ => true)
                        .ToListAsync();
        }

        public Task<User> GetUser(long id)
        {
            FilterDefinition<User> filter =
                Builders<User>.Filter.Eq(u => u.UserId, id);
            return _context
                .Users
                .Find(filter)
                .FirstOrDefaultAsync();
        }

        public async Task Create(User user)
        {
            await _context.Users.InsertOneAsync(user);
        }

        public async Task<bool> Update(User user)
        {
            ReplaceOneResult updateResult =
                await _context.Users.ReplaceOneAsync(
                    filter: u => u.DBId == user.DBId,
                    replacement: user);

            return updateResult.IsAcknowledged
                && updateResult.ModifiedCount > 0;

        }

        public async Task<bool> Delete(long id)
        {
            FilterDefinition<User> filter = Builders<User>.Filter.Eq(u => u.UserId, id);

            DeleteResult deleteResult = await _context
                                                .Users
                                                .DeleteOneAsync(filter);

            return deleteResult.IsAcknowledged
                && deleteResult.DeletedCount > 0;
        }

        public async Task<long> GetNextId()
        {
            return await _context.Users.CountDocumentsAsync(new BsonDocument()) + 1;


        }
    }
}
