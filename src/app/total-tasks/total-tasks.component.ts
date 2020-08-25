import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskService } from '../services/task.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-total-tasks',
  templateUrl: './total-tasks.component.html',
  styleUrls: ['./total-tasks.component.scss']
})
export class TotalTasksComponent implements OnInit {
  selectedid
  taskdetails
  totalsize
  selectedvalues = [];
  reqobj = {

    username: this.authenticationService.currentUserValue.username,
    pagesize: 3,
    pagenumber: 1

  }
  constructor(private http: HttpClient, private tasksrvc: TaskService,public authenticationService: AuthenticationService) { }

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

  handlePage(event){
    this.reqobj.pagenumber = event.pageIndex  + 1;
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
