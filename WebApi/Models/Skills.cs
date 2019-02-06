using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Skills
    {
        [BsonId, BsonElement("dbId")]
        public ObjectId DBId { get; private set; }
        public string Skill { get; set; }
    }
}
