import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnamneseService {
  private apiUrl = 'http://localhost:8080/api/v1/anamnese';
  private _http = inject(HttpClient);

  constructor() {}

  listarAnamneses(pageNumber: number, pageSize: number, sortData?: any): Observable<any> {
    let params: HttpParams;

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

    return this._http.get<any>(this.apiUrl, { params });
  }

  incluirAnamnese(anamnese: any): Observable<any> {
    return this._http.post<any>(this.apiUrl, anamnese);
  }

  excluirAnamnese(id: number): Observable<any> {
    return this._http.delete<any>(`${this.apiUrl}/${id}`);
  }

  editarAnamnese(id: number, anamnese: any): Observable<any> {
    return this._http.put<any>(`${this.apiUrl}/${id}`, anamnese);
  }

  obterAnamnesePorId(id: number): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/${id}`);
  }

  pesquisarPorData(data: string): Observable<any> {
    // Ajuste o nome do parâmetro conforme seu backend
    return this._http.get<any>(`${this.apiUrl}/search?data=${data}`);
  }

  pesquisarPorIdCliente(idCliente: number): Observable<any> {
    // Ajuste o nome do parâmetro conforme seu backend
    return this._http.get<any>(`${this.apiUrl}/search?patientId=${idCliente}`);
  }
}
