import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component'
import {JwtInterceptor} from './jwt.interceptor';
import { SpinnerComponent } from './spinner/spinner.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { PendingTasksComponent } from './pending-tasks/pending-tasks.component';
import { TotalTasksComponent } from './total-tasks/total-tasks.component';
import { TodaysTasksComponent } from './todays-tasks/todays-tasks.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LandingComponent,
    SpinnerComponent,
    CompletedTasksComponent,
    PendingTasksComponent,
    TotalTasksComponent,
    TodaysTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
