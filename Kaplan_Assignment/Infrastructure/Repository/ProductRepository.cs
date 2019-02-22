using Infrastructure.Models;
using Infrastructure.UoW;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly IUnitOfWork uow;

        public ProductRepository(IUnitOfWork uow) : base(uow)
        {
            this.uow = uow;
        }

    }
}
