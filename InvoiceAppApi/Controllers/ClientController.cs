using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using InvoiceAppApi.Services;
using InvoiceAppApi.Models;

namespace InvoiceAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        // POST: api/Client
        [HttpPost]
        public async Task<IActionResult> CreateClient([FromBody] ClientDto clientDto)
        {
            if (clientDto == null)
            {
                return BadRequest("Client data is null.");
            }

            await _clientService.CreateClient(clientDto);
            return Ok("Client created successfully!");
        }

        // GET: api/Client
        [HttpGet]
        public async Task<IActionResult> GetClients()
        {
            var clients = await _clientService.GetClients();
            return Ok(clients);
        }
    }
}
