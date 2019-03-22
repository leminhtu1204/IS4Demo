using IdentityModel;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServer4.EntityFramework.Storage;
using Kaplan.Ontrack.IdentityService.Customized;
using Kaplan.Ontrack.IdentityService.Data.Application;
using Kaplan.Ontrack.IdentityService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System;
using System.Linq;
using System.Reflection;
using System.Security.Claims;

namespace Kaplan.Ontrack.IdentityService
{
    public class SeedData
    {
        public static void EnsureSeedIdentityData(IConfiguration config)
        {
            var connectionString = config.GetConnectionString("DefaultConnection");
            var services = new ServiceCollection();
            services.AddDbContext<ApplicationDbContext>(options =>
               options.UseMySql(connectionString));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            using (var serviceProvider = services.BuildServiceProvider())
            {
                using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    var context = scope.ServiceProvider.GetService<ApplicationDbContext>();
                    context.Database.Migrate();

                    var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                    var alice = userMgr.FindByNameAsync("alice").Result;
                    if (alice == null)
                    {
                        alice = new ApplicationUser
                        {
                            UserName = "alice"
                        };
                        var result = userMgr.CreateAsync(alice, "Pass123$").Result;
                        if (!result.Succeeded)
                        {
                            throw new Exception(result.Errors.First().Description);
                        }

                        result = userMgr.AddClaimsAsync(alice, new Claim[]{
                        new Claim(JwtClaimTypes.Name, "Alice Smith"),
                        new Claim(JwtClaimTypes.GivenName, "Alice"),
                        new Claim(JwtClaimTypes.FamilyName, "Smith"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                    }).Result;
                        if (!result.Succeeded)
                        {
                            throw new Exception(result.Errors.First().Description);
                        }
                        Console.WriteLine("alice created");
                    }
                    else
                    {
                        Console.WriteLine("alice already exists");
                    }

                    var bob = userMgr.FindByNameAsync("bob").Result;
                    if (bob == null)
                    {
                        bob = new ApplicationUser
                        {
                            UserName = "bob"
                        };
                        var result = userMgr.CreateAsync(bob, "Pass123$").Result;
                        if (!result.Succeeded)
                        {
                            throw new Exception(result.Errors.First().Description);
                        }

                        result = userMgr.AddClaimsAsync(bob, new Claim[]{
                        new Claim(JwtClaimTypes.Name, "Bob Smith"),
                        new Claim(JwtClaimTypes.GivenName, "Bob"),
                        new Claim(JwtClaimTypes.FamilyName, "Smith"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                        new Claim("location", "somewhere")
                    }).Result;
                        if (!result.Succeeded)
                        {
                            throw new Exception(result.Errors.First().Description);
                        }
                        Console.WriteLine("bob created");
                    }
                    else
                    {
                        Console.WriteLine("bob already exists");
                    }
                }
            }
        }

        public static void EnsureSeedConfigurationData(IConfiguration config)
        {
            var connectionString = config.GetConnectionString("DefaultConnection");
            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;
            var services = new ServiceCollection();
            services.AddOperationalDbContext(options =>
            {
                options.ConfigureDbContext = db => db.UseMySql(connectionString, mySqlOptions =>
                {
                    mySqlOptions.ServerVersion(new Version(8, 0, 15), ServerType.MySql);
                    mySqlOptions.MigrationsAssembly(migrationsAssembly);
                });
            });
            services.AddConfigurationDbContext(options =>
            {
                options.ConfigureDbContext = db => db.UseMySql(connectionString, mySqlOptions =>
                {
                    mySqlOptions.ServerVersion(new Version(8, 0, 15), ServerType.MySql);
                    mySqlOptions.MigrationsAssembly(migrationsAssembly);
                });
            });

            var serviceProvider = services.BuildServiceProvider();

            using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                scope.ServiceProvider.GetService<PersistedGrantDbContext>().Database.Migrate();

                var context = scope.ServiceProvider.GetService<ConfigurationDbContext>();
                context.Database.Migrate();

                if (!context.Clients.Any())
                {
                    Console.WriteLine("Clients being populated");
                    foreach (var client in config.GetClients("Clients"))
                    {
                        context.Clients.Add(client.ToEntity());
                    }
                    context.SaveChanges();
                }
                else
                {
                    Console.WriteLine("Clients already populated");
                }

                if (!context.IdentityResources.Any())
                {
                    Console.WriteLine("IdentityResources being populated");
                    foreach (var resource in config.GetIdentityResources("IdentityResources"))
                    {
                        context.IdentityResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }
                else
                {
                    Console.WriteLine("IdentityResources already populated");
                }

                if (!context.ApiResources.Any())
                {
                    Console.WriteLine("ApiResources being populated");
                    foreach (var resource in config.GetApis("ApiResources"))
                    {
                        context.ApiResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }
                else
                {
                    Console.WriteLine("ApiResources already populated");
                }
            }
        }
    }
}
