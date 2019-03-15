using GraphQL;
using GraphQL.Types;
using Kaplan.Ontrack.ApiGateway.Infrastructure.GraphQL;
using Kaplan.Ontrack.ApiGateway.Models;

namespace Kaplan.Ontrack.ApiGateway.Schema.Types
{
    public class UserType : ObjectGraphType<User>, ITypeBase
    {
        public UserType()
        {
            this.Name = nameof(User);
            Field(x => x.Id);
            Field(x => x.Name);
            Field<ListGraphType<RoleType>>(name: nameof(User.Roles));
        }
    }
}
