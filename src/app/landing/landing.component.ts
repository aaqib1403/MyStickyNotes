import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { TaskService } from '../services/task.service'
import { MatDialog } from '@angular/material/dialog';
import { AddeditdialogComponent } from '../addeditdialog/addeditdialog.component';
import { ChangestatusdialogComponent } from '../changestatusdialog/changestatusdialog.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

export const MY_FORMATS = {
  parse: {
    dateInput: ['DD-MM-YYYY'],
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    }
  ]
})


export class LandingComponent implements OnInit {
  selectedvalues = [];
  minDate
  displayedColumns: string[] = ['createdon', 'taskdetails', 'status'];
  dataSource = new MatTableDataSource<any>([]);;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(public authenticationService: AuthenticationService, private formBuilder: FormBuilder, private http: HttpClient, private tasksrvc: TaskService, public dialog: MatDialog, private router: Router) { }
  paginationobj;
  pagination = new BehaviorSubject<any>(null);
  pagination$ = this.pagination.asObservable();
  vm$
  totalsize = 1;
  todaytasks
  resdata
  reqobj = {

    username: this.authenticationService.currentUserValue.username,
    pagesize: 3,
    pagenumber: 1

  }
  dateform: FormGroup

  ngOnInit(): void {


    this.getServerData(this.reqobj)


    this.dateform = this.formBuilder.group({
      fmdttm: [null, Validators.required],
      todttm: [null, Validators.required],
    });


  }
  onNext(event) {
    this.reqobj.pagenumber = event.pageIndex + 1;
    this.reqobj.pagesize = event.pageSize;
    this.getServerData(this.reqobj)
  }


  onSearch() {

    let fromdate = moment(this.dateform.controls["fmdttm"].value).format('YYYY-MM-DD');

    let todate = moment(this.dateform.controls["todttm"].value).format('YYYY-MM-DD');

    this.tasksrvc.datesub.next({
      fromDate: fromdate,
      toDate: todate
    })


  }
  onReset() {
    this.dateform.reset();
    this.minDate = null
    this.tasksrvc.datesub.next(null);
  }
  toggelereset() {
    if (this.dateform.controls["fmdttm"].value != null || this.dateform.controls["todttm"].value != null) {
      return false
    }
    else {
      return true
    }
  }
  onDateChange(value) {
    this.minDate = moment(value).format('YYYY-MM-DD');
  }

  getServerData(reqobj) {

    this.tasksrvc.taskscountSub$.subscribe(
      (data: any) => {
        if (data) {
          this.resdata = data;

        }
      })


    this.tasksrvc.selectedvaluesSub$.subscribe((res: any) => {
      if (res) {
        this.selectedvalues = res;
      }

    })
  }
  ondelete() {
    const dialogRef = this.dialog.open(ChangestatusdialogComponent, {
      width: '250px',
      data: {
        title: "info",
        message: "Do you want to Delete Selected Records"
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.post<any>("/mystickynotes/delete", {
          id: this.selectedvalues.map(selctedvalue => selctedvalue.id)
        }).subscribe(count => {
          if (count == this.selectedvalues.length) {
            this.dialog.open(ChangestatusdialogComponent, {
              width: '250px',
              data: {
                title: "Success",
                message: "Deleted Successfully"
              }
            }).afterClosed().subscribe(res => {
              console.log(res)
              this.router.navigate(['/landing/']);
            })
          }
        })
      }
    })
  }
  onCompleted(status) {

    const dialogRef = this.dialog.open(ChangestatusdialogComponent, {
      width: '250px',
      data: {
        title: "info",
        message: "Do you want to change the status"
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.post<any>("/mystickynotes/markby", {

          checkedStatus: status,
          id: this.selectedvalues.map(selctedvalue => selctedvalue.id)
        }).subscribe(count => {
          if (count == this.selectedvalues.length) {
            this.dialog.open(ChangestatusdialogComponent, {
              width: '250px',
              data: {
                title: "Success",
                message: "Status Changed Successfully"
              }
            }).afterClosed().subscribe(res => {
              this.router.navigate(['/landing/']);
            })
          }
        })

      }
    })

  }
  onEdit() {
    this.dialog.open(AddeditdialogComponent, {
      width: '350px',
      data: {
        header: "Edit",
        selectedRow: this.selectedvalues[0]
      }
    })
  }

  onAdd() {
     this.dialog.open(AddeditdialogComponent, {
      width: '350px',
      data: {
        header: "Add"
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.tasksrvc.addeditsub$.pipe(distinctUntilChanged()).subscribe(reqparams => {
          if (reqparams) {
            this.http.post<any>("mystickynotes/savedetails/" + this.reqobj.username, reqparams).subscribe(res => {
              if (res) {
                this.dialog.open(ChangestatusdialogComponent, {
                  width: '250px',
                  data: {
                    title: "Success",
                    message: "Task Created Successfully"
                  }
                }).afterClosed().subscribe(res => {
                  this.tasksrvc.redirectTo("/landing/")
                })
              }
              else {
                this.dialog.open(ChangestatusdialogComponent, {
                  width: '250px',
                  data: {
                    title: "Failed",
                    message: "Operation Failed"
                  }
                }).afterClosed().subscribe(res => {
                  this.tasksrvc.redirectTo("/landing/")
                })
              }
            })
          }
        })
      }
    }) 
  } 
}