using GraphQL.Types;
using Kaplan.Ontrack.ApiGateway.Infrastructure.GraphQL;
using Kaplan.Ontrack.ApiGateway.Models;

namespace Kaplan.Ontrack.ApiGateway.Schema.Inputs
{
    public class UserInput : InputObjectGraphType<User>, IInputBase
    {
        public UserInput()
        {
            Field(x => x.Id);
            Field(x => x.Name);
        }
    }
}
