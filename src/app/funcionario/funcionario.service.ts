import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../departamento/departamento.service';

export interface Funcionario {
  id: number;
  nome: string;
  departamentoId: number;
  departamento?: Departamento;
}

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
  private apiUrl = 'https://localhost:7070/api/funcionario';

  constructor(private http: HttpClient) {}

  listarPorDepartamento(departamentoId: number): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}/departamento/${departamentoId}`);
  }

  listar(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }

  cadastrar(funcionario: Partial<Funcionario>): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, funcionario);
  }

  editar(id: number, funcionario: Partial<Funcionario>): Observable<Funcionario> {
    return this.http.put<Funcionario>(this.apiUrl, funcionario);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
