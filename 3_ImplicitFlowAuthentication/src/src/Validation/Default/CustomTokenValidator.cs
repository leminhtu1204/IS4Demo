using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using IdentityServer4.Stores;
using IdentityServer4.Configuration;
using IdentityServer4.Logging.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication;
using IdentityServer4.Encrypt;

namespace IdentityServer4.Validation.Default
{
    internal class CustomTokenValidator : TokenValidator, ITokenValidator
    {
        public CustomTokenValidator(IdentityServerOptions options,
            IHttpContextAccessor context,
            IClientStore clients,
            IProfileService profile,
            IReferenceTokenStore referenceTokenStore,
            IRefreshTokenStore refreshTokenStore,
            ICustomTokenValidator customValidator,
            IKeyMaterialService keys,
            ISystemClock clock,
            ILogger<TokenValidator> logger) : base(options, context, clients, profile, referenceTokenStore, refreshTokenStore, customValidator, keys, clock, logger)
        {
            
        }

        public override Task<TokenValidationResult> ValidateIdentityTokenAsync(string token, string clientId = null, bool validateLifetime = true)
        {
            //var decryptedToken = Crypto.Decrypt(token);
            //return base.ValidateIdentityTokenAsync(decryptedToken, clientId, validateLifetime);
            return base.ValidateIdentityTokenAsync(token, clientId, validateLifetime);
        }

        public override Task<TokenValidationResult> ValidateAccessTokenAsync(string token, string expectedScope = null)
        {
            var decryptedToken = Crypto.Decrypt(token);
            return base.ValidateAccessTokenAsync(decryptedToken, expectedScope);
        }
    }
}
