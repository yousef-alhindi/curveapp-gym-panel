import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {
constructor(   @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DescriptionComponent>){}
}
