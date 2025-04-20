import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService, ClientDto } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client',
  imports: [CommonModule, FormsModule],
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
  clients: ClientDto[] = [];
  newClient: ClientDto = new ClientDto({ name: '', email: '' });

  constructor(private api: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.api.clientGET().subscribe({
      next: (clients: any) => {
        // Handle the successful response, e.g., store clients in a property
        this.clients = clients; // Assuming 'clients' is a class property
        console.log('Clients loaded:', clients);
    },
    error: (error: any) => {
        // Handle errors, e.g., log or show a notification
        console.error('Error loading clients:', error);
    },
    complete: () => {
        // Optional: Handle completion if needed
        console.log('Client loading completed');
    }
    });
  }

  addClient() {
    this.api.clientPOST(this.newClient).subscribe(() => {
      this.newClient = new ClientDto();
      this.loadClients(); // refresh list
    });
  }
}
