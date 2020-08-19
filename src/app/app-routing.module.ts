import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { PendingTasksComponent } from './pending-tasks/pending-tasks.component';
import { TotalTasksComponent } from './total-tasks/total-tasks.component';
import { TodaysTasksComponent } from './todays-tasks/todays-tasks.component';


const routes: Routes = [
  { path: '', component: HomeComponent , children:[
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'landing', component: LandingComponent,children:[
    {path : '',component:TodaysTasksComponent},
    {path : 'completed',component:CompletedTasksComponent},
    {path : 'pending',component:PendingTasksComponent},
    {path : 'total',component:TotalTasksComponent}

  ] }

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
