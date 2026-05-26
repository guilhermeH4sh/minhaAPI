import { Routes } from '@angular/router';
import { AlunoListComponent } from './components/aluno-list/aluno-list.component';
import { AlunoDetailComponent } from './components/aluno-detail/aluno-detail.component';
import { AlunoDisciplinasComponent } from './components/aluno-disciplinas/aluno-disciplinas.component';
import { AlunoEditComponent } from './components/aluno-edit/aluno-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'alunos', pathMatch: 'full' },
  { path: 'alunos', component: AlunoListComponent },
  { path: 'alunos/:ra', component: AlunoDetailComponent },
  { path: 'alunos/:ra/disciplinas', component: AlunoDisciplinasComponent },
  { path: 'alunos/:ra/editar', component: AlunoEditComponent },
  { path: '**', redirectTo: 'alunos' }
];
