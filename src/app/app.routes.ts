import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'tasks',
    loadComponent: () => import('./modules/tasks/components/task-list/task-list.component')
      .then(m => m.TaskListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/components/login/login.component')
      .then(m => m.LoginComponent)
  },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', redirectTo: '/tasks' }
]; 