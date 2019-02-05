using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Position
    {
        public long PositionId { get; set; }
        public Company Company { get; set; }
        public string PositionDescription { get; set; }
        public string PositionRole { get; set; }
        public string Location { get; set; }
        public List<string> Tech { get; set; }
        //public List<User> InternalContact { get; set; }
        //public List<User> IsInterested { get; set; }

    }
}
