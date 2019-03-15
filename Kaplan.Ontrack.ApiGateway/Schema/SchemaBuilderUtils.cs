using GraphQL.Utilities;
using System;
using System.Dynamic;
using System.IO;
using System.Linq;

namespace Kaplan.Ontrack.ApiGateway.Schema
{
    public class SchemaBuilderUtils
    {
        public static string GetDefinitions()
        {
            var basePath = Directory.GetCurrentDirectory();
            var schemaPath = Path.Combine(basePath, "GraphQL", "Schema", "schema.gql");
            var content = File.ReadAllText(schemaPath);

            return content;
        }
    }
}
