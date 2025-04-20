import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface ClientDto {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = `${environment.apiUrl}/Client`;

  constructor(private http: HttpClient) {}

  getClients(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(this.baseUrl);
  }

  addClient(client: ClientDto): Observable<any> {
    return this.http.post(this.baseUrl, client);
  }
}


