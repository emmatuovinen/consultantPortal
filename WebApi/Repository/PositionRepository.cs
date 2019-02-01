using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Context;
using WebApi.Models;

namespace WebApi.Repository
{
    public class PositionRepository : IPositionRepository
    {
        private readonly IDbContext _context;

        public PositionRepository(IDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Position>> GetAllPositions()
        {
            return await _context
                        .Positions
                        .Find(_ => true)
                        .ToListAsync();
        }

        public async Task<IEnumerable<Position>> GetActivePositions()
        {
            FilterDefinition<Position> filter =
                Builders<Position>.Filter.Eq(p => p.IsActive, true);

            return await _context
                        .Positions
                        .Find(filter)
                        .ToListAsync();
        }

        public async Task Create(Position position)
        {

            await _context.Positions.InsertOneAsync(position);
        }

        public async Task<bool> Update(Position position)
        {
            ReplaceOneResult replace =
                await _context.Positions.ReplaceOneAsync(
                    filter: p => p.PositionId == position.PositionId,
                    replacement: position);

            return replace.IsAcknowledged &&
                replace.ModifiedCount < 0;
        }

        public Task<Position> GetPosition(string positionId)
        {
            var parsedId = ObjectId.Parse(positionId);
            FilterDefinition<Position> filter =
                Builders<Position>.Filter.Eq(p => p.PositionId, parsedId);

            return _context
                    .Positions
                    .Find(filter)
                    .FirstOrDefaultAsync();
        }
    }
}
