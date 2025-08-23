import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Funcionario, FuncionarioService } from './funcionario.service';
import { Departamento, DepartamentoService } from '../departamento/departamento.service';

@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  funcionario: Partial<Funcionario> = {};
  departamentos: Departamento[] = [];
  editando: Funcionario | null = null;
  mensagem: string = '';
  erro: string = '';
  departamentoSelecionado: number | null = null;

  constructor(
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit() {
    this.carregarDepartamentos();
    this.listarFuncionarios();
  }

  carregarDepartamentos() {
    this.departamentoService.listar().subscribe({
      next: (deps) => this.departamentos = deps,
      error: () => this.erro = 'Erro ao carregar departamentos.'
    });
  }

  listarFuncionarios() {
    if (this.departamentoSelecionado) {
      this.funcionarioService.listarPorDepartamento(this.departamentoSelecionado).subscribe({
        next: (dados) => {
          this.funcionarios = dados;
          this.erro = '';
        },
        error: () => this.erro = 'Erro ao carregar funcionários do departamento.'
      });
    } else {
      this.funcionarios = [];
      this.erro = '';
    }
  }

  salvar() {
    if (this.editando) {
      // Enviar objeto completo, incluindo id, conforme esperado pelo backend
      const dados = {
        id: this.editando.id,
  nome: this.funcionario.nome,
  departamentoId: this.funcionario.departamentoId,
  rg: this.funcionario.rg,
  foto: this.funcionario.foto
      };
      this.funcionarioService.editar(this.editando.id, dados).subscribe({
        next: () => {
          this.mensagem = 'Funcionário atualizado com sucesso!';
          this.cancelar();
          this.listarFuncionarios();
        },
        error: () => this.erro = 'Erro ao atualizar funcionário.'
      });
    } else {
      // garantir que enviamos apenas campos relevantes
      const payload: Partial<Funcionario> = {
        nome: this.funcionario.nome,
        departamentoId: this.funcionario.departamentoId,
        rg: this.funcionario.rg,
        foto: this.funcionario.foto
      };

      this.funcionarioService.cadastrar(payload).subscribe({
        next: () => {
          this.mensagem = 'Funcionário cadastrado com sucesso!';
          this.funcionario = {};
          this.listarFuncionarios();
        },
        error: () => this.erro = 'Erro ao cadastrar funcionário.'
      });
    }
  }

  editarFuncionario(func: Funcionario) {
    this.editando = func;
    this.funcionario = { ...func };
    this.mensagem = '';
    this.erro = '';
  }

  excluir(id: number) {
    if (confirm('Deseja excluir este funcionário?')) {
      this.funcionarioService.excluir(id).subscribe({
        next: () => {
          this.mensagem = 'Funcionário excluído!';
          this.listarFuncionarios();
        },
        error: () => this.erro = 'Erro ao excluir funcionário.'
      });
    }
  }

  selecionarDepartamento(id: number | null) {
    this.departamentoSelecionado = id;
    this.listarFuncionarios();
  }

  cancelar() {
    this.editando = null;
    this.funcionario = {};
    this.mensagem = '';
    this.erro = '';
  }
}
