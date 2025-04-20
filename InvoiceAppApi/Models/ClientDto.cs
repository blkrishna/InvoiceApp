using InvoiceApp.Domain;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace InvoiceAppApi.Models
{
    public class ClientDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
}