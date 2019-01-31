using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Context
{
    public interface IDbContext
    {
        IMongoCollection<TechTree> TechTree { get; }
        IMongoCollection<User> Users { get; }
        IMongoCollection<Company> Companies { get; }
    }
}
