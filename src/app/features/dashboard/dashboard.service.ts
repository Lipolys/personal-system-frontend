import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/api/v1/reports';

  constructor(private http: HttpClient) {}

  getClientesAtivosInativos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/active-inactive-clients`);
  }

  getClientesPorSexo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients-by-gender`);
  }

  getClientesPorMensalidade(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients-by-subscription`);
  }

  getClientesPorIdade(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients-by-age`);
  }

  // getAniversariantes(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/aniversariantes`);
  // }

  getClientesComSemAnamnese(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients-with-without-anamnese`);
  }

  getCrescimentoClientesAnamnese(): Observable<any> {
    return this.http.get(`${this.apiUrl}/client-growth-anamnese`);
  }

  getCrescimentoClientesAtivos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/active-client-growth`);
  }

  getClientesPorCidade(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients-by-city`);
  }
}
