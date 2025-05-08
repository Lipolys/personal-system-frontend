import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {saveAs} from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class AnamneseService {
  private apiUrl = 'http://localhost:8080/api/v1/anamnese';

  private _http = inject(HttpClient);

  constructor() {}

  listarAnamneses(pageNumber: number, pageSize: number, sortData: any): Observable<any> {
    let params = new HttpParams()
      .set('page', pageNumber)
      .set('size', pageSize);

    if (sortData) {
      params = params.set('sort', `${sortData.sortParam},${sortData.sortDirection}`);
    }

    return this._http.get<any>(this.apiUrl, { params: params });
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

  pesquisarAnamneses(patientName: any, startDate?: string | null, endDate?: string | null): Observable<any> {
    let params = new HttpParams();

    if (patientName != null) {
      params = params.set('patientName', patientName);
    }
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this._http.get<any>(`${this.apiUrl}/search`, { params });
  }

  exportarAnamnese(id: number) {
    this._http.get(`${this.apiUrl}/${id}/export`, { responseType: 'blob', observe: 'response' }).subscribe({
      next: (response) => {
        const blob = response.body!;
        const contentDisposition = response.headers.get('content-disposition');
        const fileNameMatch = contentDisposition?.match(/filename="?(.+)"?/);
        const fileName = fileNameMatch?.[1] || `anamnese-${id}.txt`;

        saveAs(blob, fileName);
      },
      error: (err) => {
        console.error('Erro ao exportar o arquivo:', err);
      }
    });
  }

  validarAnamnese(file: FormData): Observable<any> {
    return this._http.post(`${this.apiUrl}/validate`, file, {responseType: 'text'});
  }
}
