using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Context;
using WebApi.Models;

namespace WebApi.Repository
{
    public class SkillsRepository : ISkillsRepository
    {
        private readonly IDbContext _context;

        public SkillsRepository(IDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Skills>> GetAllSkills()
        {
            return await _context
                        .TechTree
                        .Find(_ => true)
                        .ToListAsync();

        }

        public Task<Skills> GetSkill(string _id)
        {
            var objectId = GetObjectId(_id);

            FilterDefinition<Skills> filter =
                Builders<Skills>.Filter.Eq(t => t.DBId, objectId);

            return _context
                .TechTree
                .Find(filter)
                .FirstOrDefaultAsync();

        }

        public async Task Create(Skills skill)
        {
            await _context.TechTree.InsertOneAsync(skill);
        }

        public async Task<bool> Delete(string _id)
        {
            var objectId = GetObjectId(_id);

            FilterDefinition<Skills> filter =
                Builders<Skills>.Filter.Eq(t => t.DBId, objectId);

            DeleteResult deleteResult = await _context
                                        .TechTree
                                        .DeleteOneAsync(filter);

            return deleteResult.IsAcknowledged
                && deleteResult.DeletedCount < 0;
        }

        public async Task<long> GetNextId()
        {
            return await _context.TechTree.CountDocumentsAsync(new BsonDocument()) + 1;
        }

        private ObjectId GetObjectId(string id)
        {
            if (!ObjectId.TryParse(id, out ObjectId objectId))
                objectId = ObjectId.Empty;

            return objectId;
        }
    }
}
