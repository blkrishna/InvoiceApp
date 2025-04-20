using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceApp.Application
{
    public interface IInvoiceService
    {
        Task<bool> CheckClientExists(int clientId);
        Task CreateInvoice(InvoiceDto invoiceDto);
    }
}
