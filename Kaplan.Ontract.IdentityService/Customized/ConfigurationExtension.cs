using IdentityServer4.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;

namespace Kaplan.Ontrack.IdentityService.Customized
{
    public static class ConfigurationExtension
    {
        public static IEnumerable<Client> GetClients(this IConfiguration configuration, string clientSectionName)
        {
            var configurationSection = configuration.GetSection(clientSectionName);
            var clients = new List<Client>();
            configurationSection.Bind(clients);

            return clients;
        }

        public static IEnumerable<IdentityResource> GetIdentityResources(this IConfiguration configuration, string clientSectionName)
        {
            var configurationSection = configuration.GetSection(clientSectionName);
            var resources = new List<IdentityResource>();
            configurationSection.Bind(resources);

            return resources;
        }

        public static IEnumerable<ApiResource> GetApis(this IConfiguration configuration, string clientSectionName)
        {
            var configurationSection = configuration.GetSection(clientSectionName);
            var resources = new List<ApiResource>();
            configurationSection.Bind(resources);

            return resources;
        }
    }
}
