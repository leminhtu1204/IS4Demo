﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kaplan.Ontrack.ApiGateway.Models
{
    public class User
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public List<Role> Roles {get;set;}
    }
}
