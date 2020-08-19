import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import {TaskService} from '../services/task.service'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  selectedvalues = [];
  displayedColumns: string[] = ['createdon', 'taskdetails', 'status'];
  dataSource = new MatTableDataSource<any>([]);;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private http: HttpClient,private tasksrvc:TaskService) { }
  paginationobj;
  pagination = new BehaviorSubject<any>(null);
  pagination$ = this.pagination.asObservable();
  vm$
  totalsize = 1;
  todaytasks
  resdata
  reqobj = {

    username: "admin",
    pagesize: 3,
    pagenumber: 1

  }
  ngOnInit(): void {

    this.getServerData(this.reqobj)
    // this.vm$ = combineLatest(this.pagination).pipe(map(([pagination])))


  }
  onNext(event) {
    this.reqobj.pagenumber = event.pageIndex + 1;
    this.reqobj.pagesize = event.pageSize;
    this.getServerData(this.reqobj)
  }


  getServerData(reqobj) {
  /*   this.http.post<any>("/mystickynotes/initialrequest",
      reqobj
    ).subscribe(
      (data: any) => {
        if (data) {

          this.resdata= data;

        }
      }) */

      this.tasksrvc.taskscountSub$.subscribe(
        (data: any) => {
          if (data) {
            this.resdata= data;
  
          }
        })
  

      this.tasksrvc.selectedvaluesSub$.subscribe((res:any) => {
        if(res){
          this.selectedvalues= res;
        }
  
      })
  }
  ondelete(){
    console.log(this.selectedvalues)
  }
  onCompleted(){
    console.log(this.selectedvalues)
  }

}
