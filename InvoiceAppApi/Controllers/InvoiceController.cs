using InvoiceApp.Application;
using InvoiceApp.Domain.Entities;
using InvoiceApp.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static System.Net.Mime.MediaTypeNames;
using System.Collections.Generic;
using System.Threading.Channels;

namespace InvoiceAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateInvoice([FromBody] InvoiceDto invoiceDto)
        {
            // Validate the ClientId before proceeding
            var clientExists = await _invoiceService.CheckClientExists(invoiceDto.ClientId);

            if (!clientExists)
            {
                return BadRequest($"Client with ID {invoiceDto.ClientId} does not exist.");
            }

            await _invoiceService.CreateInvoice(invoiceDto);
            return Ok("Invoice created successfully!");
        }
    }
}
