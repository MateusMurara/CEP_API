import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private baseUrl: string = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) { }

  getCEP(cep: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${cep}/json`);
  }
}
