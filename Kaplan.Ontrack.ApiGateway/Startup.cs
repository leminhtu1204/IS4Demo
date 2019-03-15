using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using GraphQL.Server.Ui.Playground;
using GraphQL;
using GraphQL.DataLoader;
using Kaplan.Ontrack.ApiGateway.Schema;
using Kaplan.Ontrack.ApiGateway.Schemas;
using GraphQL.Types;
using System.Linq;
using Kaplan.Ontrack.ApiGateway.Infrastructure.GraphQL;
using Kaplan.Ontrack.ApiGateway.Infrastructure.Common;

namespace Kaplan.Ontrack.ApiGateway
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddCors(options =>
            {
                // this defines a CORS policy called "default"
                options.AddPolicy("AllowAnyOrigin", policy =>
                {
                    policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            RegisterGraphQL(services);

            var sp = services.BuildServiceProvider();
            services.AddSingleton<ISchema>(new OntrackSchema(new FuncDependencyResolver(type => sp.GetService(type))));
        }

        private void RegisterGraphQL(IServiceCollection services)
        {
            services.AddSingleton<IDocumentExecuter, DocumentExecuter>();
            services.AddSingleton<IDataLoaderContextAccessor, DataLoaderContextAccessor>();
            services.AddSingleton<DataLoaderDocumentListener>();
            RegisterGraphQLTypes(services);
            services.AddSingleton<Query>();
            services.AddSingleton<Mutation>();
        }

        private void RegisterGraphQLTypes(IServiceCollection services)
        {
            var allTypes = typeof(Startup).Assembly.GetTypes();

            var typeItems = allTypes.Where(x => x.Name.EndsWith("Type") 
                && x.GetImmediateInterfaces().Any(y => y == typeof(ITypeBase)));
            foreach (var item in typeItems)
            {
                services.AddSingleton(item);
            }

            var inputItems = allTypes.Where(x => x.Name.EndsWith("Input")
                && x.GetImmediateInterfaces().Any(y => y == typeof(IInputBase)));
            foreach (var item in inputItems)
            {
                services.AddSingleton(item);
            }

            var mutationItems = allTypes.Where(x => x.Name.EndsWith("Mutation")
                && x.GetImmediateInterfaces().Any(y => y == typeof(IMutationBase)));
            foreach (var item in mutationItems)
            {
                services.AddScoped(item);
            }

            var queryItems = allTypes.Where(x => x.Name.EndsWith("Query")
                && x.GetImmediateInterfaces().Any(y => y == typeof(IQueryBase)));
            foreach (var item in queryItems)
            {
                services.AddScoped(item);
            }
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("AllowAnyOrigin");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
            app.UseGraphQLPlayground(new GraphQLPlaygroundOptions()
            {
                Path = "/graphql"
            });
        }
    }
}
