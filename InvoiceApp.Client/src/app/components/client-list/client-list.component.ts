import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-list',
  template: `
    <h2>Clients</h2>
    <ul *ngIf="clients.length > 0; else noData">
      <li *ngFor="let client of clients">{{ client.name }}</li>
    </ul>
    <ng-template #noData>No clients found</ng-template>
  `
})
export class ClientListComponent implements OnInit {
  clients: any[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }
}

