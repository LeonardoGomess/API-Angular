
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { DepartamentoComponent } from './departamento/departamento.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RouterLinkWithHref, DepartamentoComponent, FuncionarioComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('api-angular');
}
