using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Repository
{
    public interface IPositionRepository
    {
        Task<IEnumerable<Position>> GetAllPositions();

        Task<IEnumerable<Position>> GetActivePositions();

        Task Create(Position position);

        Task<bool> Update(Position position);

        Task<Position> GetPosition(string PositionId);
    }
}
