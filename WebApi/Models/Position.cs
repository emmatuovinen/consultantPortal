using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Position
    {
        [BsonId, BsonElement("PositionId")]
        public ObjectId PositionId { get; private set; }
        public Company Company { get; set; }
        public string PositionDescription { get; set; }
        public string PositionRole { get; set; }
        public string Location { get; set; }
        public bool IsActive { get; set; }
        public string PositionStatus { get; set; }
        public List<string> PositionSkills { get; set; }
        //public List<User> InternalContact { get; set; }
        //public List<User> IsInterested { get; set; }

    }
}
