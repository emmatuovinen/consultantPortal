using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Config;
using WebApi.Models;

namespace WebApi.Context
{
    public class DbContext : IDbContext
    {
        private readonly IMongoDatabase _db;

        public DbContext(IOptions<Settings> config)
        {
            var client = new MongoClient(config.Value.ConnectionString);
            _db = client.GetDatabase(config.Value.Database);
        }

        public IMongoCollection<User> Users =>
            _db.GetCollection<User>("Users");

        public IMongoCollection<TechTree> TechTree =>
            _db.GetCollection<TechTree>("TechTree");

        public IMongoCollection<Company> Companies =>
            _db.GetCollection<Company>("Companies");

        public IMongoCollection<Position> Positions =>
            _db.GetCollection<Position>("Positions");
    }
}
