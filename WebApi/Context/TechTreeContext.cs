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
    public class TechTreeContext : ITechTreeContext
    {
        private readonly IMongoDatabase _db;

        public TechTreeContext(IOptions<Settings> config)
        {
            var client = new MongoClient(config.Value.ConnectionString);
            _db = client.GetDatabase(config.Value.Database);
        }

        public IMongoCollection<TechTree> TechTree =>
            _db.GetCollection<TechTree>("techTree");
    }
}
