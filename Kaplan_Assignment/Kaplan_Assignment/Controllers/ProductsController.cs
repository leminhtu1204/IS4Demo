using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationCore.Services;
using Infrastructure.Models;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Kaplan_Assignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService productService;
        public ProductsController(IProductService productService)
        {
            this.productService = productService;
        }

        // GET: api/Product
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var products = await this.productService.Get();
            return this.Ok(products);
        }

        // GET: api/Product
        [HttpGet]
        [Route("errors")]
        public IActionResult GetTestError()
        {
            throw new Exception("test");
        }

        // GET: api/Product/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await this.productService.Get(x => x.Id == id);
            if (product == null)
            {
                return this.NotFound();
            }
            return this.Ok(product);
        }

        // POST: api/Product
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Product product)
        {
            await this.productService.Add(product);
            return this.Ok();
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] Product product)
        {
            await this.productService.Update(product);
            return this.Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await this.productService.Get(x => x.Id == id);
            await this.productService.Delete(product.FirstOrDefault());
            return this.Ok();
        }
    }
}
