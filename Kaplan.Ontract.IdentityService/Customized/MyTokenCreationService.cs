using Kaplan.Ontrack.IdentityService.Infrastructure.AppSettings;
using IdentityServer4.Services;
using Kaplan.Ontrack.Framework.Fernet;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace Kaplan.Ontrack.IdentityService.Customized
{
    public class MyTokenCreationService : DefaultTokenCreationService
    {
        private readonly IdentityServerOptions _identityServerOptions;

        public MyTokenCreationService(
            ISystemClock clock,
            IKeyMaterialService keys,
            ILogger<DefaultTokenCreationService> logger,
            IOptions<IdentityServerOptions> identityServerOptions)
            : base(clock, keys, logger)
        {
            this._identityServerOptions = identityServerOptions.Value;
        }

        protected override async Task<string> CreateJwtAsync(JwtSecurityToken jwt)
        {
            this.Logger.LogDebug("Create token started.");

            var jwtToken = await base.CreateJwtAsync(jwt);
            var clientId = GetClientId(jwt);
            if (_identityServerOptions.ClientsUsedFernet.Contains(clientId))
            {
                this.Logger.LogDebug("Create Fernet token successful.");
                return SimpleFernet.Encrypt(
                    _identityServerOptions.FernetKey.UrlSafe64Decode(),
                    jwtToken.ToBase64String().UrlSafe64Decode());
            }

            this.Logger.LogDebug("Create JWT successful.");
            return jwtToken;
        }

        private static string GetClientId(JwtSecurityToken jwt)
        {
            return jwt.Claims
                            .Where(c => c.Type == "client_id")
                            .Single()
                            .Value;
        }
    }
}
