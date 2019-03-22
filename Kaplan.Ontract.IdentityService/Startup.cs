// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using Kaplan.Ontrack.IdentityService.Customized;
using Kaplan.Ontrack.IdentityService.Data.Application;
using Kaplan.Ontrack.IdentityService.Infrastructure.AppSettings;
using Kaplan.Ontrack.IdentityService.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System;
using System.Reflection;

namespace Kaplan.Ontrack.IdentityService
{
    public class Startup
    {
        public IHostingEnvironment Environment { get; }
        public IConfiguration Configuration { get; }

        public Startup(
            IHostingEnvironment environment,
            IConfiguration configuration)
        {
            Environment = environment;
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContextPool<ApplicationDbContext>(
                options => options.UseMySql(connectionString,
                    mySqlOptions =>
                    {
                        mySqlOptions.ServerVersion(new Version(8, 0, 15), ServerType.MySql);
                    }
            ));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc().SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1);

            var identityServerOpts = Configuration.GetSection(nameof(IdentityServerOptions));

            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;
            var builder = services.AddIdentityServer(opt =>
            {
                opt.Events.RaiseErrorEvents = true;
                opt.Events.RaiseInformationEvents = true;
                opt.Events.RaiseFailureEvents = true;
                opt.Events.RaiseSuccessEvents = true;
                opt.IssuerUri = identityServerOpts.GetValue<string>(nameof(IdentityServerOptions.IssuerUri));
            })
                .AddAspNetIdentity<ApplicationUser>()
                // this adds the config data from DB (clients, resources, CORS)
                .AddConfigurationStore(options =>
                {
                    options.ConfigureDbContext = db =>
                        db.UseMySql(connectionString,
                            mySqlOptions =>
                            {
                                mySqlOptions.ServerVersion(new Version(8, 0, 15), ServerType.MySql);
                                mySqlOptions.MigrationsAssembly(migrationsAssembly);
                            });
                })
                // this adds the operational data from DB (codes, tokens, consents)
                .AddOperationalStore(options =>
                {
                    options.ConfigureDbContext = db =>
                        db.UseMySql(connectionString,
                            mySqlOptions =>
                            {
                                mySqlOptions.ServerVersion(new Version(8, 0, 15), ServerType.MySql);
                                mySqlOptions.MigrationsAssembly(migrationsAssembly);
                            });

                    // this enables automatic token cleanup. this is optional.
                    options.EnableTokenCleanup = true;
                    // options.TokenCleanupInterval = 15; // interval in seconds. 15 seconds useful for debugging
                });

            services.Configure<IdentityServerOptions>(this.Configuration.GetSection(nameof(IdentityServerOptions)));

            if (Environment.IsDevelopment())
            {
                builder.AddDeveloperSigningCredential();
            }
            else
            {
                builder.AddSigningCredential();
            }

            services.AddAuthentication()
                .AddGoogle("Google", options =>
                {
                    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;

                    options.ClientId = "571302409575-a18uquv2j6pr1j324s3cpbvkmn5knals.apps.googleusercontent.com";
                    options.ClientSecret = "PAYAyEq6JZbIiueofuuuNnVV";
                });

            services.AddTransient<ITokenCreationService, MyTokenCreationService>();
            services.AddTransient<IIntrospectionRequestValidator, MyIntrospectionRequestValidator>();
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
        }

        public void Configure(IApplicationBuilder app)
        {
            if (Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("AllowAnyOrigin"); // need change later

            app.UseStaticFiles();

            app.UseIdentityServer();

            app.UseMvcWithDefaultRoute();
        }
    }
}