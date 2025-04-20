using Microsoft.VisualBasic;
using static System.Net.Mime.MediaTypeNames;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics.X86;

namespace InvoiceApp.Domain.Entities
{
    public class Invoice
    {
        public int Id { get; set; }
        public string InvoiceNumber { get; set; }
        public DateTime InvoiceDate { get; set; }
        public decimal Amount { get; set; }

        // Foreign key property
        public int ClientId { get; set; }

        // Navigation property
        public Client Client { get; set; }
    }
}
