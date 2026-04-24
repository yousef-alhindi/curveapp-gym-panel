import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DetailDialogComponent } from "../common-dialog/detail-dialog/detail-dialog.component";
import { RatingDialogComponent } from "../common-dialog/rating-dialog/rating-dialog.component";
import { ApiService } from "src/app/service/api.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl } from "@angular/forms";

export interface PeriodicElement1 {
  id: string;
  customer: string;
  order_at: string;
  order_type: string;
  location: string;
  total: string;
  discount: string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
  },
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
  },
];

export interface PeriodicElement2 {
  id: string;
  customer: string;
  order_at: string;
  order_type: string;
  location: string;
  total: string;
  discount: string;
}

const ELEMENT_DATA2: PeriodicElement2[] = [
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
  },
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
  },
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
  },
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
  },
];

@Component({
  selector: "app-order-mgmt",
  templateUrl: "./order-mgmt.component.html",
  styleUrls: ["./order-mgmt.component.css"],
})
export class OrderMgmtComponent {
  displayedColumns1: string[] = [
    "id",
    "customer",
    "order_at",
    "order_type",
    "order_details",
    "location",
    "total",
    "discount",
  
  ];

  displayedColumns2: string[] = [
    "id",
    "customer",
    "order_at",
    "order_type",
    "order_details",
    "location",
    "total",
    "discount",
    
  ];

  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);
  dataSource2 = new MatTableDataSource<PeriodicElement2>(ELEMENT_DATA2);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;
  @ViewChild("MatPaginator2") MatPaginator2!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
    this.dataSource2.paginator = this.MatPaginator2;
  }
  restroId: any;

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private toastr: ToastrService
  ) {
    const localData = sessionStorage.getItem("curve-restaurants") || "";
    const restroData = JSON.parse(localData);
    this.restroId = restroData._id;
  }

  detailDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    element: any
  ): void {
    this.dialog.open(DetailDialogComponent, {
      width: "850px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: {element:element , type:2},
    });
  }

  ratingViewDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    elementId:any
  ): void {
    this.dialog.open(RatingDialogComponent, {
      width: "550px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: elementId
    });
  }
  ngOnChanges(){
    this.getRestroData({});

  }
  ngOnInit() {
    this.getRestroData({});
  }
  totalLength1: any;
  totalLength2: any;
  totalLength3: any;
  totalLength4: any;
  onStatusChange(event: any, id: string) {
    const selectedValue = event.target.value;

    if (selectedValue == "2") {
      this.changeStatus(id, 2);
    } else if (selectedValue == "4") {
      this.changeStatus(id, 4);
    } else if (selectedValue == "5") {
      this.changeStatus(id, 5);
    } else if (selectedValue == "3") {
      this.changeStatus(id, 3);
    }
  }
  changeStatus(id: any, status: number) {
    const data = {
      status: status,
    };
    this.api.patch1("order/updateStatus/" + id, data).subscribe({
      next: (res: any) => {
        this.getRestroData({});
        this.toastr.success("Data Updated SuccessFully");
      },
      error: (res: any) => {
        this.toastr.error("Error changing status");
        this.getRestroData({});
      },
    });
  }

  restroType: number = 1;
  page: number = 1;
  limit: number = 5;
  search: string = "";
  currentTabIndex: number = 0;
  searchHome: string = "";
  searchService: string = "";
  selectedfilter: string = "";
  tab: string = "true";
  reset(){
    this.fromDate = ''
    this.toDate = ''
    this.searchHome = ''
    this.selectedfilter = ''
    this.searchQuery = '';
    this.dateForm.reset();
    // this.getRestroData({});
  }
  onPageChange1(event: any): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getRestroData({
      pageChange: true,
    });
  }
  onPageChange2(event: any): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getRestroData({
      pageChange: true,
    });
  }

  searchQuery: string = '';  
  onTabChange(event: any) {
    this.reset()
    this.currentTabIndex = event.index;
    this.tab = event.tab.textLabel;
    if(this.tab === 'Active Booking'){
      this.tab = 'true'
    } else if(this.tab === 'Past Booking'){
       this.tab = 'false'
    }

    this.getRestroData(event);
  }
  onSearch1(event: any) {
    this.searchHome = event.target.value;
    this.getRestroData({});
  }
  onSearch2(event: any) {
    this.searchHome = event.target.value;
    this.getRestroData({});
  }

  serviceFilter(selectedValue: any) {
    this.selectedfilter = selectedValue;
    this.getRestroData({});
  }
  dateForm: any = new FormGroup({
    fromDate: new FormControl(""),
    toDate: new FormControl(""),
  });
  fromDate: any = "";
  toDate: any = "";
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
    let searchQuery = this.searchHome;
    const filter =
      this.currentTabIndex === 0 ? this.selectedfilter : this.selectedfilter;
      // orderType=${filter}
    this.api
      .get1(
        `subscriptions?startDate=${this.fromDate}&endDate=${this.toDate}&search=${searchQuery}&limit=${this.limit}&page=${this.page}&active=${this.tab}`
      )
      .subscribe({
        next: (res: any) => {
          this.restaurantData = res.data
              this.dataSource1 = res?.data["subscriptions"];
          setTimeout(() => {
            this.MatPaginator1.length = res.data.totalRecords;
            this.MatPaginator2.length = res.data.totalRecords;

            this.totalLength1 = res.data.totalRecords;
            this.totalLength2 = res.data.totalRecords;

            this.MatPaginator1.pageIndex = this.page - 1;
            this.MatPaginator2.pageIndex = this.page - 1;

          });
          console.log(res);
        },
        error: (res: any) => {
          console.log(res.message);
          // this.toastr.error("Error fetching details");
        },
      }); 
  }
  getStatus(statusCode: number): string {
    let status: string;

    switch (statusCode) {
      case 4:
        status = "Delivered";
        break;
      case 5:
        status = "Rejected";
        break;

      default:
        status = "N/A";
    }

    return status;
  }
}
