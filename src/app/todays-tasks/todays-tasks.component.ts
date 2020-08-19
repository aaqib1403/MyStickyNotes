import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-todays-tasks',
  templateUrl: './todays-tasks.component.html',
  styleUrls: ['./todays-tasks.component.scss']
})
export class TodaysTasksComponent implements OnInit {
  resdata
  todaytasks
  completedtasks;
  pendingtasks;
  totaltasks;
  taskdetails;
  selectedvalues = [];
  reqobj = {

    username: "admin",
    pagesize: 3,
    pagenumber: 1

  }
  constructor(private http: HttpClient, private tasksrvc: TaskService) { }

  ngOnInit(): void {

    this.getServerData(this.reqobj)

  }

  getServerData(reqobj) {
    this.http.post<any>("/mystickynotes/initialrequest",
      reqobj
    ).subscribe(
      (data: any) => {
        if (data) {

          this.completedtasks = data.completedtasks;
          this.pendingtasks = data.pendingtasks;
          this.totaltasks = data.totaltasks;
          this.taskdetails = data.tasksonloginday;
          this.todaytasks = data.todaytasks;
          this.tasksrvc.taskscountSub.next(
            {
              todaytasks: this.todaytasks,
              completedtasks: this.completedtasks,
              pendingtasks: this.pendingtasks,
              totaltasks: this.totaltasks
            }
          )

        }
      })

  }


  onchange(event, data) {
    if (event.checked) {
      this.selectedvalues.push(data.id);
    }
    else {
      let index = this.selectedvalues.indexOf(data.id);
      if (index > -1) {
        this.selectedvalues.splice(index, 1);
      }
    }
    this.tasksrvc.selectedvaluesSub.next(this.selectedvalues);
  }





}
