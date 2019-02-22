using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using IdentityServer4.Encrypt;

namespace IdentityServer4.Services.Default
{
    public class FernetTokenService : DefaultTokenService, ITokenService
    {
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="claimsProvider"></param>
        /// <param name="referenceTokenStore"></param>
        /// <param name="creationService"></param>
        /// <param name="contextAccessor"></param>
        /// <param name="clock"></param>
        /// <param name="logger"></param>
        public FernetTokenService(
            IClaimsService claimsProvider,
            IReferenceTokenStore referenceTokenStore,
            ITokenCreationService creationService,
            IHttpContextAccessor contextAccessor,
            ISystemClock clock,
            ILogger<DefaultTokenService> logger) : base(claimsProvider, referenceTokenStore, creationService, contextAccessor, clock, logger)
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public override async Task<string> CreateSecurityTokenAsync(Token token)
        {
            var secured_token = await base.CreateSecurityTokenAsync(token);
            if (token.Type == "access_token")
            {
                var encryptedToken = Crypto.Encrypt(secured_token);
                return encryptedToken;
            }
            return secured_token;
        }
    }
}
