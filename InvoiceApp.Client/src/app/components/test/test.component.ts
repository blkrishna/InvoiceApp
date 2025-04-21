import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService, ClientDto } from '../../services/api.service'; // Adjust path

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule], // For *ngIf and *ngFor
  providers: [ClientService],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
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