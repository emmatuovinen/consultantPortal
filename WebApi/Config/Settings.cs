using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Config
{
    public class Settings
    {
        public string ConnectionString { get; set; }
        public string Database { get; set; }
        public string Container { get; internal set; }
        public bool IsContained { get; internal set; }
    }
}
