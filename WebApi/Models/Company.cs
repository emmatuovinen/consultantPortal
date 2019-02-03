using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace WebApi.Models
{
    public class Company
    {
        [BsonId, BsonElement("companyObjId")]
        public ObjectId CompanyObjId { get; private set; }

        [BsonElement("companyId")]
        public long CompanyID { get; set; }

        [BsonElement("companyName")]
        public string CompanyName { get; set; }

        /*
        [BsonElement("consultantsWorking")]
        public List<User> ConsultantsWorking { get; set; }
        

        [BsonElement("consultantFavorite")]
        public List<User> ConsultantFavorite { get; set; }

        [BsonElement("companyContact")]
        public List<ContactInfo> CompanyContact { get; set; }
        */

    }
}
