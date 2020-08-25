import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  taskscountSub = new BehaviorSubject<any>(null);
  taskscountSub$ = this.taskscountSub.asObservable();

  selectedvaluesSub = new BehaviorSubject<any>(null);
  selectedvaluesSub$ = this.selectedvaluesSub.asObservable();

  datesub = new BehaviorSubject<any>(null);
  datesub$ = this.datesub.asObservable();

  addeditsub = new BehaviorSubject<any>(null);
  addeditsub$ = this.addeditsub.asObservable();
  
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
  constructor(private router: Router) { }
}
