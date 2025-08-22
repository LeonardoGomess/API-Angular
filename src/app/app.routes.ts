
import { Routes } from '@angular/router';
import { DepartamentoComponent } from './departamento/departamento.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'departamentos', pathMatch: 'full' },
	{ path: 'departamentos', component: DepartamentoComponent },
	{ path: 'funcionarios', component: FuncionarioComponent }
];
