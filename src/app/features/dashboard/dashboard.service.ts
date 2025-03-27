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
    return this.http.get(`${this.apiUrl}/clientes-ativos-inativos`);
  }

  getClientesPorSexo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clientes-por-sexo`);
  }

  getClientesPorMensalidade(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clientes-por-mensalidade`);
  }

  getClientesPorIdade(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clientes-por-idade`);
  }

  getAniversariantes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/aniversariantes`);
  }

  getClientesComSemAnamnese(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clientes-com-sem-anamnese`);
  }

  getCrescimentoClientesAnamnese(): Observable<any> {
    return this.http.get(`${this.apiUrl}/crescimento-clientes-anamnese`);
  }

  getCrescimentoClientesAtivos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/crescimento-clientes-ativos`);
  }

  getClientesPorCidade(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clientes-por-cidade`);
  }
}
