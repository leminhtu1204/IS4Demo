using GraphQL.Types;
using Kaplan.Ontrack.ApiGateway.Infrastructure.GraphQL;
using Kaplan.Ontrack.ApiGateway.Models;
using Kaplan.Ontrack.ApiGateway.Schema.Inputs;
using Kaplan.Ontrack.ApiGateway.Schema.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kaplan.Ontrack.ApiGateway.Mutations
{
    public class CreateProductMutation : ObjectGraphType, IMutationBase
    {
        public CreateProductMutation()
        {
            Field<UserType>(
                name: "CreateUser",
                arguments: new QueryArguments(new QueryArgument<UserInput>() { Name = "User"}),
                resolve: context =>
                {
                    return new User
                    {
                        Id = "P002",
                        Name = "USer 2"
                    };
                }
                );
        }
    }
}
