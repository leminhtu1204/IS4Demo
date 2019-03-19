using GraphQL.Types;
using Kaplan.Ontrack.ApiGateway.Infrastructure.GraphQL;
using Kaplan.Ontrack.ApiGateway.Models;
using Kaplan.Ontrack.ApiGateway.Schema.Inputs;
using Kaplan.Ontrack.ApiGateway.Schema.Types;
using System;
using System.Collections.Generic;

namespace Kaplan.Ontrack.ApiGateway.Queries
{
    public class UsersQuery : ObjectGraphType<UserType>, IQueryBase
    {
        public UsersQuery()
        {
            this.Name = "Users";
            Field<ListGraphType<UserType>>(
                name: this.Name,
                resolve: context =>
                {
                    return new List<User>
                    {
                        new User
                        {
                            Id = Guid.NewGuid().ToString(),
                            UserName = "User 1",
                            Roles = new List<Role>
                            {
                                new Role
                                {
                                    Id = Guid.NewGuid().ToString(),
                                    Name = "admin"
                                }
                            }
                            
                        },
                        new User
                        {
                            Id = Guid.NewGuid().ToString(),
                            UserName = "User 2",
                            Roles = new List<Role>
                            {
                                new Role
                                {
                                    Id = Guid.NewGuid().ToString(),
                                    Name = "admin"
                                }
                            }
                        },
                        new User
                        {
                            Id = Guid.NewGuid().ToString(),
                            UserName = "User 3",
                            Roles = new List<Role>
                            {
                                new Role
                                {
                                    Id = Guid.NewGuid().ToString(),
                                    Name = "admin"
                                }
                            }
                        },
                        new User
                        {
                            Id = Guid.NewGuid().ToString(),
                            UserName = "User 4"
                        },
                        new User
                        {
                            Id = Guid.NewGuid().ToString(),
                            UserName = "User 5"
                        },
                        new User
                        {
                            Id = Guid.NewGuid().ToString(),
                            UserName = "User 6"
                        },
                        new User
                        {
                            Id = Guid.NewGuid().ToString(),
                            UserName = "User 7"
                        },
                        new User
                        {
                            Id = Guid.NewGuid().ToString(),
                            UserName = "User 8"
                        },
                        new User
                        {
                            Id = Guid.NewGuid().ToString(),
                            UserName = "User 9"
                        },
                    };
                }
                );
        }
    }
}
