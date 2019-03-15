using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.DataLoader;
using GraphQL.Types;
using GraphQL.Validation;
using Kaplan.Ontrack.ApiGateway.Models;
using Kaplan.Ontrack.ApiGateway.Schema;
using Kaplan.Ontrack.ApiGateway.Schemas;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Kaplan.Ontrack.ApiGateway.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GraphQLController : ControllerBase
    {
        private readonly ISchema _schema;
        private readonly IDocumentExecuter _documentExecuter;
        private readonly DataLoaderDocumentListener _dataLoaderDocumentListener;
        private readonly IEnumerable<IValidationRule> _validationRules;
        private readonly ILogger _logger;

        public GraphQLController(
            ISchema schema,
            IDocumentExecuter documentExecuter,
            DataLoaderDocumentListener dataLoaderDocumentListener,
            IEnumerable<IValidationRule> validationRules,
            ILogger<GraphQLController> logger
            )
        {
            this._schema = schema;
            this._documentExecuter = documentExecuter;
            this._dataLoaderDocumentListener = dataLoaderDocumentListener;
            this._validationRules = validationRules;
            this._logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GraphQLQueryPayload query, CancellationToken cancellationToken)
        {
            try
            {
                if (query == null)
                {
                    throw new ArgumentNullException(nameof(query));
                }

                var inputs = query.Variables.ToInputs();
                var executionOptions = new ExecutionOptions
                {
                    Schema = _schema,
                    Query = query.Query,
                    Inputs = inputs,
                    OperationName = query.OperationName,
                    ValidationRules = this._validationRules.Concat(DocumentValidator.CoreRules())
                };

                executionOptions.Listeners.Add(this._dataLoaderDocumentListener);

                var result = await _documentExecuter.ExecuteAsync(executionOptions).ConfigureAwait(false);
                if (result.Errors?.Count > 0)
                {
                    return BadRequest(result);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                var executionResult = new ExecutionResult();
                executionResult.Errors.Add(new ExecutionError(ex.Message));
                return BadRequest(executionResult);
            }
            
        }
    }
}
