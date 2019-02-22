using Infrastructure.UoW;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly IUnitOfWork unitOfWork;
        public Repository(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public void Add(T entity)
        {
            this.unitOfWork.Context.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            this.unitOfWork.Context.Set<T>().Remove(entity);
        }

        public async Task<IEnumerable<T>> Get()
        {
            return await this.unitOfWork.Context.Set<T>().ToListAsync();
        }

        public async Task<IEnumerable<T>> Get(Expression<Func<T, bool>> predicate)
        {
            return await this.unitOfWork.Context.Set<T>().Where(predicate).ToListAsync<T>();
        }

        public void Update(T entity)
        {
            this.unitOfWork.Context.Set<T>().Update(entity);
        }
    }
}
