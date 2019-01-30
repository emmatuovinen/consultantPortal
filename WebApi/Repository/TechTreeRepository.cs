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
    public class TechTreeRepository : ITechTreeRepository
    {
        private readonly ITechTreeContext _context;

        public TechTreeRepository(ITechTreeContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TechTree>> GetAllTechs()
        {
            return await _context
                        .TechTree
                        .Find(_ => true)
                        .ToListAsync();

        }

        public Task<TechTree> GetTech(long id)
        {
            FilterDefinition<TechTree> filter =
                Builders<TechTree>.Filter.Eq(t => t.TechId, id);

            return _context
                .TechTree
                .Find(filter)
                .FirstOrDefaultAsync();

        }

        public async Task Create(TechTree tech)
        {
            await _context.TechTree.InsertOneAsync(tech);
        }

        public async Task<bool> Delete(long id)
        {
            FilterDefinition<TechTree> filter =
                Builders<TechTree>.Filter.Eq(t => t.TechId, id);

            DeleteResult deleteResult = await _context
                                        .TechTree
                                        .DeleteOneAsync(filter);

            return deleteResult.IsAcknowledged
                && deleteResult.DeletedCount < 0;
        }
    }
}
