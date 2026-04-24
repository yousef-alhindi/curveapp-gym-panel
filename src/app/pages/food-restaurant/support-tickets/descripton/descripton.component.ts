import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-descripton',
  templateUrl: './descripton.component.html',
  styleUrls: ['./descripton.component.css']
})
export class DescriptonComponent {


constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<DescriptonComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any
  ) {
  }
}

