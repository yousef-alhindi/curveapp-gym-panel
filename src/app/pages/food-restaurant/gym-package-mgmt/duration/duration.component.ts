import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css']
})
export class DurationComponent {
constructor(   @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DurationComponent>){}
}
