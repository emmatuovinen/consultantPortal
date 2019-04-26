using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Context;
using WebApi.Models;

namespace WebApi.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IDbContext _context;

        public UserRepository(IDbContext context)
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

        public async Task<User> GetUser(string id)
        {
            var parsedId = ObjectId.Parse(id);
            FilterDefinition<User> filter =
                Builders<User>.Filter.Eq(u => u.DBId, parsedId);
            return await _context
                .Users
                .Find(filter)
                .FirstOrDefaultAsync();
        }
        //Get user by email
        public Task<User> GetUserbyEmail(string email)
        {
            FilterDefinition<User> filter =
                Builders<User>.Filter.Eq(u => u.Email, email);
            return _context
                .Users
                .Find(filter)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<User>> GetAllConsultants()
        {
            FilterDefinition<User> filter =
                Builders<User>.Filter.Eq(u => u.Role, "Consultant");

            return await _context
                        .Users
                        .Find(filter)
                        .ToListAsync();
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

        public async Task<bool> Delete(string id)
        {
            var parsedId = ObjectId.Parse(id);

            FilterDefinition<User> filter = Builders<User>.Filter.Eq(u => u.DBId, parsedId);

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

        public async Task<bool> DeleteAllMockData()
        {
            FilterDefinition<User> filter = Builders<User>.Filter.Eq(u => u.IsDemoData, true);

            DeleteResult deleteResult = await _context
                                                .Users
                                                .DeleteManyAsync(filter);

            return deleteResult.IsAcknowledged
                && deleteResult.DeletedCount > 0;
        }
    }
}
