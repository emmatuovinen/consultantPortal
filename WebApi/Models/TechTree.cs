using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class TechTree
    {
        [BsonId, BsonElement("dbId")]
        public ObjectId DBId { get; private set; }
        public string Tech { get; set; }
    }
}
