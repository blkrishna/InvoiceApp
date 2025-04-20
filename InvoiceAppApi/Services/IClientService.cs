using InvoiceApp.Domain.Entities;
using InvoiceAppApi.Models;

namespace InvoiceAppApi.Services
{
    public interface IClientService
    {
        Task CreateClient(ClientDto clientDto);
        Task<IEnumerable<Client>> GetClients();
    }
}
