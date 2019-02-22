using ApplicationCore.Services;
using Infrastructure.Models;
using Infrastructure.Repository;
using Infrastructure.UoW;
using Moq;
using NUnit.Framework;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace ProductServiceTest
{
    public class ProductServiceTest
    {
        private Mock<IRepository<Product>> mockProductRepo;
        private Mock<IUnitOfWork> mockUOW;
        private ProductService productService;

        [SetUp]
        public void Setup()
        {
            this.mockProductRepo = new Mock<IRepository<Product>>();
            this.mockUOW = new Mock<IUnitOfWork>();
            this.productService = new ProductService(this.mockUOW.Object, this.mockProductRepo.Object);
        }

        [Test]
        public void GetAllProductSuccessfully()
        {
            List<Product> products = new List<Product>
            {
                new Product
                {
                    Id = 1,
                    Name = "Iphone",
                    CreatedDate = DateTime.Parse("2/18/2019"),
                    ModifyDate = DateTime.Parse("2/18/2019")
                },
                new Product
                {
                    Id = 2,
                    Name = "Android",
                    CreatedDate = DateTime.Parse("2/18/2019"),
                    ModifyDate = DateTime.Parse("2/18/2019")
                },
                new Product
                {
                    Id = 3,
                    Name = "Samsung",
                    CreatedDate = DateTime.Parse("2/18/2019"),
                    ModifyDate = DateTime.Parse("2/18/2019")
                }
            };

            this.mockProductRepo.Setup(x => x.Get()).ReturnsAsync(products.AsEnumerable<Product>());

            var result = this.productService.Get().Result.ToList();
            Assert.IsNotNull(result);
            Assert.AreEqual(result.Count(), products.Count);
            Assert.AreEqual(result[0].Id, products[0].Id);
            Assert.AreEqual(result[0].Name, products[0].Name);
            Assert.AreEqual(result[0].CreatedDate, products[0].CreatedDate);
            Assert.AreEqual(result[0].ModifyDate, products[0].ModifyDate);
        }

        [Test]
        public void GetProductByIdSuccessfully()
        {
            List<Product> products = new List<Product>
            {
                new Product
                {
                    Id = 1,
                    Name = "Iphone",
                    CreatedDate = DateTime.Parse("2/18/2019"),
                    ModifyDate = DateTime.Parse("2/18/2019")
                }
            };

            this.mockProductRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Product,bool>>>())).ReturnsAsync(products.AsEnumerable<Product>());

            var result = this.productService.Get(x => x.Id == 1).Result.ToList();
            Assert.IsNotNull(result);
            Assert.AreEqual(result.Count(), products.Count);
            Assert.AreEqual(result[0].Id, products[0].Id);
            Assert.AreEqual(result[0].Name, products[0].Name);
            Assert.AreEqual(result[0].CreatedDate, products[0].CreatedDate);
            Assert.AreEqual(result[0].ModifyDate, products[0].ModifyDate);
        }

        [Test]
        public void AddProductSuccessfully()
        {
            Product product = new Product
            {
                Id = 1,
                Name = "Iphone",
                CreatedDate = DateTime.Parse("2/18/2019"),
                ModifyDate = DateTime.Parse("2/18/2019")
            };

            this.mockProductRepo.Setup(x => x.Add(It.IsAny<Product>()));

            this.productService.Add(product).GetAwaiter();
            this.mockUOW.Verify(x => x.CommitAsync(), Times.Once);
            
        }
    }
}