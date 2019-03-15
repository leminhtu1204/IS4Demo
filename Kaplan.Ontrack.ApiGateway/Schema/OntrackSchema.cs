using GraphQL;
using GraphQL.Types;
using Kaplan.Ontrack.ApiGateway.Schema;
using Kaplan.Ontrack.ApiGateway.Schema.Types;

namespace Kaplan.Ontrack.ApiGateway.Schemas
{
    public class OntrackSchema : GraphQL.Types.Schema
    {
        public OntrackSchema(IDependencyResolver resolver)
            : base(resolver)
        {
            Mutation = resolver.Resolve<Mutation>();
            Query = resolver.Resolve<Query>();
        }
    }
}
