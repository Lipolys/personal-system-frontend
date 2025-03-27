import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnamneseService {
  //private apiUrl = 'https://13.61.16.36:8080/api/v1/patient';
  private apiUrl = 'http://localhost:8080/api/v1/anamnese';

  private _http = inject(HttpClient);

  constructor() {}

  listarPacientes(pageNumber: number, pageSize: number, sortData: any): Observable<any> {
    let params;
    if (sortData) {
      params = new HttpParams()
        .set('page', pageNumber)
        .set('size', pageSize)
        .set('sort', `${sortData.sortParam},${sortData.sortDirection}`);
    } else {
      params = new HttpParams()
        .set('page', pageNumber)
        .set('size', pageSize);
    }

    return this._http.get<any>(`${this.apiUrl}`, { params: params });
  }

  incluirPaciente(paciente: any): Observable<any> {
    return this._http.post<any>(this.apiUrl, paciente);
  }

  excluirPaciente(id: number): Observable<any> {
    return this._http.delete<any>(`${this.apiUrl}/${id}`);
  }

  editarPaciente(id: number, paciente: any): Observable<any> {
    return this._http.put<any>(`${this.apiUrl}/${id}`, paciente);
  }

  obterPacientePorId(id: number): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/${id}`);
  }

  pesquisarPorNome(nome: string): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/search?name=${nome}`);
  }

  pesquisarPorCpf(cpf: string): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/search?cpf=${cpf}`);
  }
}
