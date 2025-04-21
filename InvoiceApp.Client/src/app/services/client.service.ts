// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface ClientDto {
//   name: string;
//   email: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ClientService {
//   //private baseUrl = `${environment.apiUrl}/Client`;
//   private baseUrl = `https://localhost:7211`;
//   constructor(private http: HttpClient) {}

//   getClients(): Observable<ClientDto[]> {
//     return this.http.get<ClientDto[]>(this.baseUrl);
//   }

//   addClient(client: ClientDto): Observable<any> {
//     return this.http.post(this.baseUrl, client);
//   }
// }

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { ClientDto } from './api.service';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({ providedIn: 'root' })
export class ClientService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ?? "";
    }

    /**
     * Fetch list of clients
     * @return OK
     */
    clientGET(): Observable<ClientDto[]> {
        let url_ = this.baseUrl + "/api/Client";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = {
            observe: "body" as const,
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.get<ClientDto[]>(url_, options_).pipe(
            _observableCatch((error: HttpErrorResponse) => {
                console.error('Error fetching clients:', error.message);
                return _observableThrow(new Error('Failed to fetch clients'));
            })
        );
    }
}


