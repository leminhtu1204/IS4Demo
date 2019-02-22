using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.UoW
{
    public interface IUnitOfWork
    {
        KaplanDemoDbContext Context { get; }

        Task CommitAsync();
    }
}
