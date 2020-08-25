import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { AuthenticationService } from '../authentication.service';
import { TaskService } from '../services/task.service';







@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss'],
 
})
export class CompletedTasksComponent implements OnInit {

  taskdetails
  totalsize
  selectedvalues = [];
  reqobj = {

    username: this.authenticationService.currentUserValue.username,
    status: "Completed",
    pagesize: 3,
    pagenumber: 1

  }
  selectedid
  dateform:FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private tasksrvc: TaskService,
    public authenticationService: AuthenticationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.tasksrvc.datesub$.subscribe(res =>{
      if(res){
        this.reqobj["fromDate"] = res.fromDate;
        this.reqobj["toDate"] = res.toDate;
        this.getServerData(this.reqobj);
      }
      else{
        this.reqobj["fromDate"] = null;
        this.reqobj["toDate"] = null;
        this.getServerData(this.reqobj);
      }
    
    }

    )
    
    
  }
  getServerData(reqobj) {
    this.http.post<any>("/mystickynotes/getByUsernameAndDates",
      reqobj
    ).subscribe(
      (data: any) => {
        if (data) {

          this.totalsize = data.totalsize;
          this.taskdetails = data.data;

        }
      })
  }
  pageevent(event) {
    this.reqobj.pagenumber = event.pageIndex + 1;
    this.reqobj.pagesize = event.pageSize;
    this.getServerData(this.reqobj);
  }
  onchange(event, data) {
    if (event.checked) {
      this.selectedvalues.push(data);
    }
    else {
      this.selectedid = [];
      for(let i of this.selectedvalues){
        this.selectedid.push(i.id);
      }
      let index = this.selectedid.indexOf(data.id);
      if (index > -1) {
        this.selectedvalues.splice(index, 1);
      }
    }
    this.tasksrvc.selectedvaluesSub.next(this.selectedvalues);
  }





}
