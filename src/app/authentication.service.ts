import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
  currentUserSubject$ = this.currentUserSubject.asObservable();
  logout =false;
  darktheme = false
  constructor() { }


  public get currentUserValue() {
    return this.currentUserSubject.value;
}

}
