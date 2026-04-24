import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: "app-rating-dialog",
  templateUrl: "./rating-dialog.component.html",
  styleUrls: ["./rating-dialog.component.css"],
})
export class RatingDialogComponent {
  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<RatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ratingsData = data.star
    this.review = data.review
  }
  ratingsData: any;
  review: any;

}
