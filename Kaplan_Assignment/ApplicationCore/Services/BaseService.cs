using Infrastructure.Repository;
using Infrastructure.UoW;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class BaseService<T> : IBaseService<T> where T : class
    {
        private readonly IRepository<T> repository;
        private readonly IUnitOfWork unitOfWork;
        public BaseService(IRepository<T> repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }
        public async Task Add(T entity)
        {
            this.repository.Add(entity);
            await this.unitOfWork.CommitAsync();

        }

        public async Task Delete(T entity)
        {
            this.repository.Delete(entity);
            await this.unitOfWork.CommitAsync();
        }

        public async Task<IEnumerable<T>> Get()
        {
            return await this.repository.Get();
        }

        public async Task<IEnumerable<T>> Get(Expression<Func<T, bool>> predicate)
        {
            return await this.repository.Get(predicate);
        }

        public async Task Update(T entity)
        {
            this.repository.Update(entity);
            await this.unitOfWork.CommitAsync();
        }
    }
}
