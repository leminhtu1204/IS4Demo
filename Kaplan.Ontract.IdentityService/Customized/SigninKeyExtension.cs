using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.IO;
using System.Reflection;
using System.Security.Cryptography;

namespace Kaplan.Ontrack.IdentityService.Customized
{
    public static class SigninKeyExtension
    {
        public static void AddSigningCredential(
            this IIdentityServerBuilder builder)
        {
            var filename = Path.Combine(Directory.GetCurrentDirectory(), "key.rsa");

            if (File.Exists(filename))
            {
                var keyFile = File.ReadAllText(filename);
                var tempKey = JsonConvert.DeserializeObject<TemporaryRsaKey>(keyFile, new JsonSerializerSettings { ContractResolver = new RsaKeyContractResolver() });

                builder.AddSigningCredential(CreateRsaSecurityKey(tempKey.Parameters, tempKey.KeyId));
            }
            else
            {
                var key = CreateRsaSecurityKey();

                RSAParameters parameters = key.Rsa != null ?
                    key.Rsa.ExportParameters(includePrivateParameters: true) :
                    key.Parameters;

                var tempKey = new TemporaryRsaKey
                {
                    Parameters = parameters,
                    KeyId = key.KeyId
                };

                File.WriteAllText(filename, JsonConvert.SerializeObject(tempKey, new JsonSerializerSettings { ContractResolver = new RsaKeyContractResolver() }));

                builder.AddSigningCredential(key);
            }
        }

        private static RsaSecurityKey CreateRsaSecurityKey(RSAParameters parameters, string id)
        {
            var key = new RsaSecurityKey(parameters)
            {
                KeyId = id
            };

            return key;
        }

        private static RsaSecurityKey CreateRsaSecurityKey()
        {
            var rsa = RSA.Create();
            RsaSecurityKey key;

            if (rsa is RSACryptoServiceProvider)
            {
                rsa.Dispose();
                var cng = new RSACng(2048);

                var parameters = cng.ExportParameters(includePrivateParameters: true);
                key = new RsaSecurityKey(parameters);
            }
            else
            {
                rsa.KeySize = 2048;
                key = new RsaSecurityKey(rsa);
            }

            key.KeyId = IdentityModel.CryptoRandom.CreateUniqueId(16);
            return key;
        }

        private class TemporaryRsaKey
        {
            public string KeyId { get; set; }
            public RSAParameters Parameters { get; set; }
        }

        private class RsaKeyContractResolver : DefaultContractResolver
        {
            protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
            {
                var property = base.CreateProperty(member, memberSerialization);

                property.Ignored = false;

                return property;
            }
        }
    }
}
