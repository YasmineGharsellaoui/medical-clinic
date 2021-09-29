import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  message: String;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.message = data.message;
     }

  onNoClick(): void {
    this.dialogRef.close({canceled: true});
  }

  onYesClick(): void {
    this.dialogRef.close({confirmed: true});
  }

  ngOnInit() {
  }

}
