using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kaplan.Ontrack.ApiGateway.Infrastructure.Common
{
    public static class TypeExtensions
    {
        public static IEnumerable<Type> GetImmediateInterfaces(this Type type)
        {
            var interfaces = type.GetInterfaces();
            var result = new HashSet<Type>(interfaces);
            foreach (Type i in interfaces)
                result.ExceptWith(i.GetInterfaces());
            return result;
        }
    }
}
