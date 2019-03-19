using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kaplan.Ontrack.ApiGateway.Models
{
    public class User
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }

        public List<Role> Roles {get;set;}
    }
}
