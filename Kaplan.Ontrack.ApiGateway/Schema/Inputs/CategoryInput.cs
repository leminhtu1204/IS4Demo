using GraphQL.Types;
using Kaplan.Ontrack.ApiGateway.Models;

namespace Kaplan.Ontrack.ApiGateway.Schema.Inputs
{
    public class CategoryInput : InputObjectGraphType<Category>
    {
        public CategoryInput()
        {
            Field(x => x.Name);
        }
    }
}
