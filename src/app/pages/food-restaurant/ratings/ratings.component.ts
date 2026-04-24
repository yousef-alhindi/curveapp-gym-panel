import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AddDialogComponent } from "../common-dialog/add-dialog/add-dialog.component";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RatingDialogComponent } from "../common-dialog/rating-dialog/rating-dialog.component";
import { SuccessfullDialogComponent } from "../common-dialog/successfull-dialog/successfull-dialog.component";
import { ApiService } from "src/app/service/api.service";
import { ToastrService } from "ngx-toastr";

export interface PeriodicElement1 {
  s_no: number;
  name:string;
  order_id:string;
  date_time: string;
  status: string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
  {
    s_no: 1,
    name: "Lorem ",
    order_id: "Lorem ",
    date_time: "Lorem",
    status:'Lorem',
  },

  {
    s_no: 1,
    name: "Lorem ",
    order_id: "Lorem ",
    date_time: "Lorem",
    status:'Lorem',
  },

  {
    s_no: 1,
    name: "Lorem ",
    order_id: "Lorem ",
    date_time: "Lorem",
    status:'Lorem',
  },
  {
    s_no: 1,
    name: "Lorem ",
    order_id: "Lorem ",
    date_time: "Lorem",
    status:'Lorem',
  },
  {
    s_no: 1,
    name: "Lorem ",
    order_id: "Lorem ",
    date_time: "Lorem",
    status:'Lorem',
  },
  {
    s_no: 1,
    name: "Lorem ",
    order_id: "Lorem ",
    date_time: "Lorem",
    status:'Lorem',
  },





 
];
@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent {
  displayedColumns1: string[] = [
    "s_no",
    "name",
    "order_id",
    "date_time",
    "ratings",
    "status",
    "action"

  ];
  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;
rating2: any;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
  }

  rating3: number;
  public form: FormGroup;

  constructor(public dialog : MatDialog, private fb: FormBuilder, private api:ApiService, private toastr:ToastrService){
    this.rating3 = 0;
    this.form = this.fb.group({
      rating1: ['', Validators.required],
      rating2: [4]
    });
  }

  ratingViewDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string, review:any, star:any): void {
    this.dialog.open(RatingDialogComponent, {
      width: "550px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data:{review:review, star:star}
    });
  }
delete(id:any){
  this.api.delete1(`ratings/${id}`).subscribe({
    next: (res:any)=>{
      this.successDialog('500ms','500ms')
    }, error : (err:any)=>{
      this.toastr.error('Error sending request')
    }
  })
}
onPageChange(event: any): void {
  this.page = event.pageIndex + 1;
  this.limit = event.pageSize;
  this.getRatings({
    pageChange: true,
  });
}
  successDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(SuccessfullDialogComponent, {
      width: "350px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: { type: 4 },
    });

    setTimeout(() => {
      // this.ngOnInit();
      dialogRef.close();
    }, 3000);
  }
  ngOnInit() {
    this.getRatings({});
  }
  onSearch(event: any) {
    this.searchHome = event.target.value;
    this.getRatings({});
  }
  page: number = 1;
  limit: number = 5;
  totalLength:any
  search: string = "";
  currentTabIndex: number = 0;
  searchHome: string = "";
  searchService: string = "";
  selectedfilter: string = "";
  ratingsData:any
  getRatings(event:any) {
    if (!event?.pageChange) {
      this.page = 1;
      this.limit = 5;
    }
    let searchQuery =
    this.currentTabIndex === 0 ? this.searchHome : this.searchService;
    this.api.get1(`ratings?page = ${this.page}&limit = ${this.limit}&search=${searchQuery}`).subscribe({
      next: (res: any) => {
        this.ratingsData = res.data.averageRating
        this.dataSource1 = res.data["ratings"];
        // this.ratingItems = this.ratingsData[0].items.map((item: any) => item._id.name);
        setTimeout(() => {
          this.MatPaginator1.length = res.data.totalRecords;
          this.totalLength = res.data.totalRecords;

          this.MatPaginator1.pageIndex = this.page - 1;
        });
      }
    });
  }
}
