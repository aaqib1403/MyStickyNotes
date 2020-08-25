import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-addeditdialog',
  templateUrl: './addeditdialog.component.html',
  styleUrls: ['./addeditdialog.component.scss']
})
export class AddeditdialogComponent implements OnInit {

  addeditform:FormGroup
  constructor(private tasksrvc: TaskService,private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddeditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.addeditform = this.formBuilder.group({
      createdon :[null,Validators.required],
      taskdetails: ['', Validators.required],
      status: ['', Validators.required]

    });

    if (this.data.header == "Edit") {
      this.addeditform.controls["createdon"].patchValue(this.data.selectedRow.createdon);
      this.addeditform.controls["taskdetails"].patchValue(this.data.selectedRow.taskdetails);
      this.addeditform.controls["status"].patchValue(this.data.selectedRow.status);

      this.addeditform.controls["createdon"].disable();

    }
    }


    onOk(){
      this.tasksrvc.addeditsub.next(this.addeditform.value);
      return true;
    }

  onCancel(): void {
    this.dialogRef.close();
  }
}
