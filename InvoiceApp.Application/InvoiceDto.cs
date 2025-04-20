namespace InvoiceApp.Application
{
    public class InvoiceDto
    {
        public string InvoiceNumber { get; set; }
        public DateTime InvoiceDate { get; set; }
        public decimal Amount { get; set; }
        public int ClientId { get; set; }
    }
}
