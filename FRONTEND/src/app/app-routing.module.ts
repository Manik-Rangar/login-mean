import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
 
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard]},
  { path: '', component: DashboardComponent ,canActivate: [AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
