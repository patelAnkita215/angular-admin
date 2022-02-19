import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './Auth/auth-guard.guard';
import { NonAuthGuardGuard } from './Auth/non-auth-guard.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [NonAuthGuardGuard],
    loadChildren: () => import('./Auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'dashboard',
    data: { title: 'Dashboard' },
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('./Dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path:'',
    redirectTo:'dashboard',
    pathMatch: 'full'
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
