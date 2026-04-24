import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AddDialogComponent } from "../common-dialog/add-dialog/add-dialog.component";
import { FormGroup, FormControl } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { ToastrService } from "ngx-toastr";

export interface PeriodicElement1 {
  s_no: number;
  id:string;
  order_id:string;
  amount: string;
  date_time: string;
  payment: string;
  admin_commision:string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
  {
    s_no: 1,
    id: "Lorem Ipsum",
    order_id: "Lorem Ipsum",
    amount: "Lorem",
    date_time: "Lorem",
    payment:'Lorem',
    admin_commision:'Lorem',

  },





 
];
@Component({
  selector: 'app-payment-mgmt',
  templateUrl: './payment-mgmt.component.html',
  styleUrls: ['./payment-mgmt.component.css']
})
export class PaymentMgmtComponent {
  displayedColumns1: string[] = [
    "s_no",
    "id",
    "order_id",
    "amount",
    "date_time",
    "payment",
    "admin_commision"

  ];
  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
  }

  constructor(public dialog : MatDialog , private api:ApiService , private toastr :ToastrService){}

  
  addDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    type: any,
    element:any

  ): void {
    const dialogRef=this.dialog.open(AddDialogComponent, {
      
      width: "650px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: { type ,element},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    // this.getcategoryList();
    });

    console.log(element)
  }
  restroType: number = 1;
  page: number = 1;
  limit: number = 5;
  totalLength:any
  search: string = "";
  currentTabIndex: number = 0;
  searchHome: string = "";
  searchService: string = "";
  selectedfilter: string = "";
  tab: string = "newOrder";
  ngOnInit(){
    this.getRestroData({})
  }
  reset(){
    this.fromDate = ''
    this.toDate = ''
    this.searchHome = ''
    this.selectedfilter = ''
  }
  onPageChange(event: any): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getRestroData({
      pageChange: true,
    });
  }
  dateForm: any = new FormGroup({
    fromDate: new FormControl(""),
    toDate: new FormControl(""),
  });
  fromDate: any = "";
  toDate: any = "";
  onSearch(event: any) {
    this.searchHome = event.target.value;
    this.getRestroData({});
  }
  restaurantData: any;
  onDateFilter() {
    const selectedFromDate = new Date(this.dateForm.value.fromDate);
    const selectedToDate = new Date(this.dateForm.value.toDate);
  
    // Set fromDate to 12:00 AM
    const fromDateValue = new Date(selectedFromDate.setHours(0, 0, 0, 0)).getTime();
    
    // Set toDate to 11:59 PM
    const toDateValue = new Date(selectedToDate.setHours(23, 59, 59, 999)).getTime();
  
    if (toDateValue < fromDateValue) {
        console.error('To date cannot be earlier than From date.');
        this.toastr.error('To date cannot be earlier than From date.');
        return;  
    }

    this.fromDate = String(fromDateValue);
    this.toDate = String(toDateValue);
    console.log('fromdate',this.fromDate)
    this.getRestroData({});
}
  getRestroData(event: any) {
    if (!event?.pageChange) {
      this.page = 1;
      this.limit = 5;
    }
    if (event?.index == 0) {
      this.restroType = 1;
    }
    if (event?.index == 1) {
      this.restroType = 2;
    }
    let searchQuery =
      this.currentTabIndex === 0 ? this.searchHome : this.searchService;
    const filter =
      this.currentTabIndex === 0 ? this.selectedfilter : this.selectedfilter;
    this.api
      .get1(
        `payments?startDate=${this.fromDate}&endDate=${this.toDate}&search=${searchQuery}&limit=${this.limit}&page=${this.page}`
      )
      .subscribe({
        next: (res: any) => {
          this.restaurantData = res["data"]
          this.dataSource1 = res?.data["subscriptions"];
          setTimeout(() => {
            this.MatPaginator1.length = res.data.totalSubscriptions;
            this.totalLength = res.data.totalSubscriptions;
  
            this.MatPaginator1.pageIndex = this.page - 1;
          });
          console.log(res);
        },
        error: (res: any) => {
          console.log(res.message);
          // this.toastr.error("Error fetching details");
        },
      });
  }
  getPymnt(statusCode: number): string {
    let status: string;

    switch (statusCode) {
      case 1:
        status = "APPLEPAY";
        break;
      case 2:
        status = "VISA";
        break;
      case 3:
        status = "WALLET";
        break;

      default:
        status = "N/A";
    }

    return status;
  }
}
