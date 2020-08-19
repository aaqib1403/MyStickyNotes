import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  taskscountSub = new BehaviorSubject<any>(null);
  taskscountSub$ = this.taskscountSub.asObservable();

  selectedvaluesSub = new BehaviorSubject<any>(null);
  selectedvaluesSub$ = this.selectedvaluesSub.asObservable();

  constructor() { }
}
