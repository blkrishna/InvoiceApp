// src/app/components/client/client.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService, ClientDto } from '../../services/api.service'; // Adjust path

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule],
  providers: [ClientService],
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
  clients: ClientDto[] = [];
  errorMessage: string | null = null;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.clientGET().subscribe({
      next: (data) => {
        this.clients = data;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.clients = [];
      }
    });
  }
}