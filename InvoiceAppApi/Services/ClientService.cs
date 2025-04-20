using InvoiceApp.Domain.Entities;
using InvoiceApp.Domain.Interfaces;
using InvoiceAppApi.Models;

namespace InvoiceAppApi.Services
{
    public class ClientService : IClientService
    {
        private readonly IRepository<Client> _repository;

        public ClientService(IRepository<Client> repository)
        {
            _repository = repository;
        }

        public async Task CreateClient(ClientDto clientDto)
        {
            var client = new Client
            {
                Name = clientDto.Name,
                Email = clientDto.Email
            };
            await _repository.AddAsync(client);
        }

        public async Task<IEnumerable<Client>> GetClients()
        {
            return await _repository.GetAllAsync();
        }
    }
}
