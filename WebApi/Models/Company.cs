using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApi.Context
{
    public class Company
    {
        [BsonId, BsonElement("companyObjId")]
        public ObjectId CompanyObjId { get; private set; }

        [BsonElement("companyId")]
        public string CompanyID { get; set; }

        [BsonElement("companyName")]
        public string CompanyName { get; set; }

        [BsonElement("consultantsWorking")]
        public List<User> ConsultantsWorking { get; set; }

        [BsonElement("consultantFavorite")]
        public List<User> ConsultantFavorite { get; set; }

        [BsonElement("companyContact")]
        public List<ContactInfo> CompanyContact { get; set; }


    }
}
