using GraphQL.Types;
using Kaplan.Ontrack.ApiGateway.Infrastructure.GraphQL;
using Kaplan.Ontrack.ApiGateway.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kaplan.Ontrack.ApiGateway.Schema.Types
{
    public class RoleType : ObjectGraphType<Role>, ITypeBase
    {
        public RoleType()
        {
            this.Name = nameof(Role);
            Field(x => x.Id);
            Field(x => x.Name);
        }
    }
}
