using Infrastructure.Models;
using Infrastructure.Repository;
using Infrastructure.UoW;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class ProductService: BaseService<Product> , IProductService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Product> repository;
        public ProductService(IUnitOfWork unitOfWork, IRepository<Product> repository) : base(repository, unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
        }
    }
}
