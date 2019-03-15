using GraphQL;
using GraphQL.DataLoader;
using GraphQL.Types;
using Kaplan.Ontrack.ApiGateway.Infrastructure.Common;
using Kaplan.Ontrack.ApiGateway.Infrastructure.GraphQL;
using Kaplan.Ontrack.ApiGateway.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kaplan.Ontrack.ApiGateway.Schema
{
    public class Query : ObjectGraphType
    {
        public Query(IServiceProvider serviceProvider)
        {
            this.Name = "RootQuery";

            var allTypes = typeof(Query).Assembly.GetTypes();
            var queryFields = allTypes.Where(x => x.Name.EndsWith("Query")
                && x.GetImmediateInterfaces().Any(y => y == typeof(IQueryBase)));

            foreach (Type fieldType in queryFields)
            {
                var newField = serviceProvider.GetService(fieldType);
                if(newField == null)
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
