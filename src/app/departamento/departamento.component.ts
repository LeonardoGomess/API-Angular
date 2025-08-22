import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Departamento, DepartamentoService } from './departamento.service';

@Component({
  selector: 'app-departamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
  departamentos: Departamento[] = [];
  departamento: Partial<Departamento> = {};
  editando: Departamento | null = null;
  mensagem: string = '';
  erro: string = '';

  constructor(private departamentoService: DepartamentoService) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.departamentoService.listar().subscribe({
      next: (dados) => this.departamentos = dados,
      error: () => this.erro = 'Erro ao carregar departamentos.'
    });
  }

  salvar() {
    if (this.editando) {
      // Enviar objeto completo igual ao Swagger
      const dados = {
        id: this.editando.id,
        nome: this.departamento.nome,
        sigla: this.departamento.sigla
      };
      this.departamentoService.editar(this.editando.id, dados).subscribe({
        next: () => {
          this.mensagem = 'Departamento atualizado com sucesso!';
          this.cancelar();
          this.listar();
        },
        error: () => this.erro = 'Erro ao atualizar departamento.'
      });
    } else {
      this.departamentoService.cadastrar(this.departamento).subscribe({
        next: () => {
          this.mensagem = 'Departamento cadastrado com sucesso!';
          this.departamento = {};
          this.listar();
        },
        error: () => this.erro = 'Erro ao cadastrar departamento.'
      });
    }
  }

  editarDepartamento(dep: Departamento) {
    this.editando = dep;
    this.departamento = { ...dep };
    this.mensagem = '';
    this.erro = '';
  }

  excluir(id: number) {
    if (confirm('Deseja excluir este departamento?')) {
      this.departamentoService.excluir(id).subscribe({
        next: () => {
          this.mensagem = 'Departamento excluído!';
          this.listar();
        },
        error: () => this.erro = 'Erro ao excluir departamento.'
      });
    }
  }

  cancelar() {
    this.editando = null;
    this.departamento = {};
    this.mensagem = '';
    this.erro = '';
  }
}
