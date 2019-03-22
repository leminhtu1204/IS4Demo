namespace Kaplan.Ontrack.IdentityService.Infrastructure.AppSettings
{
    public class IdentityServerOptions
    {
        public string IssuerUri { get; set; }

        public string FernetKey { get; set; }

        public string[] ClientsUsedFernet { get; set; }
    }
}
