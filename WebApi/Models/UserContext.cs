using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Config;

namespace WebApi.Models
{
    public class UserContext : IUserContext
    {
        private readonly IMongoDatabase _db;

        public UserContext(IOptions<Settings> config)
        {
            var client = new MongoClient(config.Value.ConnectionString);
            _db = client.GetDatabase(config.Value.Database);
        }

        public IMongoCollection<User> Users =>
            _db.GetCollection<User>("Users");

    }
}
