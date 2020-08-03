import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';


const routes: Routes = [
  { path: '', component: HomeComponent , children:[
  { path: 'login', component: LoginComponent },
  { path: 'landing', component: LandingComponent },

  { path: 'register', component: RegisterComponent }]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
