import { mergeMap as _observableMergeMap, catchError as _observableCatch, catchError } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf, throwError } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class ClientService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ?? "";
    }

    /**
     * @param body (optional) 
     * @return OK
     */
    clientPOST(body: ClientDto | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/Client";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processClientPOST(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processClientPOST(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else
                return _observableThrow(response_) as any as Observable<void>;
        }));
    }

    protected processClientPOST(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(null as any);
    }

    /**
     * @return OK
     */
    clientGET(): Observable<ClientDto[]> {
        let url_ = this.baseUrl + "/api/Client";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = {
            observe: "body" as const, // Get the response body directly
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

        // return this.http.get<ClientDto[]>(url_, options_).pipe(
        //     catchError((error: HttpErrorResponse) => {
        //         console.error('Error fetching clients:', error.message);
        //         return throwError(() => new Error('Failed to fetch clients'));
        //     })
        // );
    }

    /**
     * @param body (optional) 
     * @return OK
     */
    invoice(body: InvoiceDto | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/Invoice";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processInvoice(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processInvoice(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else
                return _observableThrow(response_) as any as Observable<void>;
        }));
    }

    protected processInvoice(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(null as any);
    }
}

export class ClientDto implements IClientDto {
    name?: string | undefined;
    email?: string | undefined;

    constructor(data?: IClientDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.email = _data["email"];
        }
    }

    static fromJS(data: any): ClientDto {
        data = typeof data === 'object' ? data : {};
        let result = new ClientDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["email"] = this.email;
        return data;
    }
}

export interface IClientDto {
    name?: string | undefined;
    email?: string | undefined;
}

export class InvoiceDto implements IInvoiceDto {
    invoiceNumber?: string | undefined;
    invoiceDate?: Date;
    amount?: number;
    clientId?: number;

    constructor(data?: IInvoiceDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.invoiceNumber = _data["invoiceNumber"];
            this.invoiceDate = _data["invoiceDate"] ? new Date(_data["invoiceDate"].toString()) : <any>undefined;
            this.amount = _data["amount"];
            this.clientId = _data["clientId"];
        }
    }

    static fromJS(data: any): InvoiceDto {
        data = typeof data === 'object' ? data : {};
        let result = new InvoiceDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["invoiceNumber"] = this.invoiceNumber;
        data["invoiceDate"] = this.invoiceDate ? this.invoiceDate.toISOString() : <any>undefined;
        data["amount"] = this.amount;
        data["clientId"] = this.clientId;
        return data;
    }
}

export interface IInvoiceDto {
    invoiceNumber?: string | undefined;
    invoiceDate?: Date;
    amount?: number;
    clientId?: number;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}