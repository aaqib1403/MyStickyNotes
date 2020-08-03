import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
  currentUserSubject$ = this.currentUserSubject.asObservable();
  loadingSub = new BehaviorSubject<boolean>(false);
  loadingSub$ = this.loadingSub.asObservable();
  logout =false;
  darktheme = false
  hideloginregister = true;
  constructor(private router: Router) { }


  public get currentUserValue() {
    return this.currentUserSubject.value;
}
onLogout(){
    

  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
  this.router.navigate(['']);
  this.logout = false;

}
}
