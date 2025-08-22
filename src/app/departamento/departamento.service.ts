import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Departamento {
  id: number;
  nome: string;
  sigla: string;
}

@Injectable({ providedIn: 'root' })
export class DepartamentoService {
  private apiUrl = 'https://localhost:7070/api/departamento';

  constructor(private http: HttpClient) {}

  listar(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }

  cadastrar(departamento: Partial<Departamento>): Observable<Departamento> {
    return this.http.post<Departamento>(this.apiUrl, departamento);
  }

  editar(id: number, departamento: Partial<Departamento>): Observable<Departamento> {
    return this.http.put<Departamento>(this.apiUrl, departamento);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
