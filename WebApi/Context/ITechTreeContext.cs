using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Context
{
    public interface ITechTreeContext
    {
        IMongoCollection<TechTree> TechTree { get; }
    }
}
