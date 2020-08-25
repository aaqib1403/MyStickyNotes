import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-changestatusdialog',
  templateUrl: './changestatusdialog.component.html',
  styleUrls: ['./changestatusdialog.component.scss']
})
export class ChangestatusdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ChangestatusdialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
