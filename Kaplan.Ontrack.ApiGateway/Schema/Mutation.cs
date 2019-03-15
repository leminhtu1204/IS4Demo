using GraphQL;
using GraphQL.Types;
using Kaplan.Ontrack.ApiGateway.Infrastructure.Common;
using Kaplan.Ontrack.ApiGateway.Infrastructure.GraphQL;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kaplan.Ontrack.ApiGateway.Schema
{
    public class Mutation : ObjectGraphType
    {
        public Mutation(IServiceProvider serviceProvider)
        {
            this.Name = "RootMutation";

            var allTypes = typeof(Query).Assembly.GetTypes();
            var mutationFields = allTypes.Where(x => x.Name.EndsWith("Mutation")
                && x.GetImmediateInterfaces().Any(y => y == typeof(IMutationBase)));

            foreach (Type fieldType in mutationFields)
            {
                var newField = serviceProvider.GetService(fieldType);
                if (newField == null)
                {
                    continue;
                }
                var fields = newField.GetPropertyValue("Fields") as List<FieldType>;

                foreach (var field in fields)
                {
                    this.AddField(field);
                }
            }
        }
    }
}
