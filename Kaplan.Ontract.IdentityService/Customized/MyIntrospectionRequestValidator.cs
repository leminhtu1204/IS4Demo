using IdentityServer4.Models;
using IdentityServer4.Validation;
using Kaplan.Ontrack.Framework.Fernet;
using Kaplan.Ontrack.IdentityService.Infrastructure.AppSettings;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Specialized;
using System.Net;
using System.Threading.Tasks;

namespace Kaplan.Ontrack.IdentityService.Customized
{
    public class MyIntrospectionRequestValidator : IIntrospectionRequestValidator
    {
        private readonly ILogger _logger;
        private readonly ITokenValidator _tokenValidator;
        private IdentityServerOptions _identityServerOptions;

        public MyIntrospectionRequestValidator(
            ILogger<MyIntrospectionRequestValidator> logger,
            ITokenValidator tokenValidator,
            IOptions<IdentityServerOptions> identityServerOptions)
        {
            _logger = logger;
            _tokenValidator = tokenValidator;
            _identityServerOptions = identityServerOptions.Value;
        }

        public async Task<IntrospectionRequestValidationResult> ValidateAsync(NameValueCollection parameters, ApiResource api)
        {
            _logger.LogDebug("Introspection request validation started.");

            // retrieve required token
            var token = parameters.Get("token");
            if (token == null)
            {
                _logger.LogError("Token is missing");

                return new IntrospectionRequestValidationResult
                {
                    IsError = true,
                    Api = api,
                    Error = "missing_token",
                    Parameters = parameters
                };
            }

            // validate token
            if (SimpleFernet.IsFernetToken(token))
            {
                var fernet64Token = WebUtility.UrlDecode(token);
                var jwt64Token = SimpleFernet.Decrypt(
                    _identityServerOptions.FernetKey.UrlSafe64Decode(),
                    fernet64Token.UrlSafe64Decode(),
                    out var timestamp);

                token = jwt64Token.UrlSafe64Encode().FromBase64String();
            }

            var tokenValidationResult = await _tokenValidator.ValidateAccessTokenAsync(token);

            // invalid or unknown token
            if (tokenValidationResult.IsError)
            {
                _logger.LogDebug("Token is invalid.");

                return new IntrospectionRequestValidationResult
                {
                    IsActive = false,
                    IsError = false,
                    Token = token,
                    Api = api,
                    Parameters = parameters
                };
            }

            _logger.LogDebug("Introspection request validation successful.");

            // valid token
            return new IntrospectionRequestValidationResult
            {
                IsActive = true,
                IsError = false,
                Token = token,
                Claims = tokenValidationResult.Claims,
                Api = api,
                Parameters = parameters
            };
        }
    }
}
