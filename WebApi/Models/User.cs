using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApi.Models
{
    public class User
    {
        [BsonId, BsonElement("dbId")]
        public ObjectId DBId { get; private set; }

        [BsonElement("userId")]
        public long UserId { get; set; }

        [BsonElement("firstName")]
        public string FirstName { get; set; }

        [BsonElement("lastName")]
        public string LastName { get; set; }

        [BsonElement("role")]
        public string Role { get; set; }

        //public List<ContactInfo> ContactInfos { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("phoneNumber")]
        public string PhoneNumber { get; set; }

        [BsonElement("Description"), StringLength(1000)]
        public string Description { get; set; }

        public bool IsDemoData { get; set; }

        public List<TechTree> UserTechTree { get; set; }

        public List<Position> PositionsInterested { get; set; }

        public List<Company> FavoriteCompanies { get; set; }


    }
}
