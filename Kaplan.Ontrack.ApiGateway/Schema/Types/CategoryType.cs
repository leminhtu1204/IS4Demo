using GraphQL.Types;
using Kaplan.Ontrack.ApiGateway.Infrastructure.GraphQL;
using Kaplan.Ontrack.ApiGateway.Models;

namespace Kaplan.Ontrack.ApiGateway.Schema.Types
{
    public class CategoryType : ObjectGraphType<Category>, ITypeBase
    {
        public CategoryType()
        {
            this.Name = nameof(Category);
            Field(x => x.Name);
        }
    }
}
