using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.UoW
{
    public class UnitOfWork : IUnitOfWork
    {
        public KaplanDemoDbContext Context { get; }

        public UnitOfWork(KaplanDemoDbContext context)
        {
            this.Context = context;
        }

        public async Task CommitAsync()
        {
            await this.Context.SaveChangesAsync();
        }

        public void Dispose()
        {
            Context.Dispose();
        }
    }
}
