using InvoiceApp.Domain.Entities;
using InvoiceApp.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceApp.Application
{
    public class InvoiceService : IInvoiceService
    {
        private readonly IRepository<Invoice> _repository;

        public InvoiceService(IRepository<Invoice> repository)
        {
            _repository = repository;
        }

        public async Task<bool> CheckClientExists(int clientId)
        {
            var client = await _repository.GetByIdAsync(clientId);
            return client != null;
        }

        public async Task CreateInvoice(InvoiceDto invoiceDto)
        {
            var invoice = new Invoice
            {
                InvoiceNumber = invoiceDto.InvoiceNumber,
                InvoiceDate = invoiceDto.InvoiceDate,
                Amount = invoiceDto.Amount,
                ClientId = invoiceDto.ClientId
            };
            await _repository.AddAsync(invoice);
        }
    }
}
