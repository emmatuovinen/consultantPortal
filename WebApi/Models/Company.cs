using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApi.Models
{
    public class Company
    {
        public ObjectId CompanyObjId { get; set; }
        public string CompanyID { get; set; }
        public string CompanyName { get; set; }

    }
}
