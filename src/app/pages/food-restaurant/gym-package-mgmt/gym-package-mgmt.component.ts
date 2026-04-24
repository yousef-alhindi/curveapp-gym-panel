import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { DescriptionComponent } from "./description/description.component";
import { DurationComponent } from "./duration/duration.component";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { DeleteDialogComponent } from "../common-dialog/delete-dialog/delete-dialog.component";


export interface PeriodicElement1 {
  s_no: number;
  package: string;
  price: string;
  gender: string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
 {s_no:1,package:'Lorem',price:'Lorem',gender:'Lorem'}
];

@Component({
  selector: 'app-gym-package-mgmt',
  templateUrl: './gym-package-mgmt.component.html',
  styleUrls: ['./gym-package-mgmt.component.css']
})
export class GymPackageMgmtComponent {
  displayedColumns1: string[] = [
    "s_no",
    "package_name",
    "gender",
    "duration",
    "description",
    "t$c",
    "created_on",
    "action",
  ];
  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
  }
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private api: ApiService,
    private toastr: ToastrService
  ) {}
 
  descriptionView(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    element:any
  ): void {
    this.dialog.open(DescriptionComponent, {
      width: "700px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data:element
    });
  }
  durationView(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    element:any
  ): void {
    this.dialog.open(DurationComponent, {
      width: "700px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data:element
    });
  }
  ngOnInit() {
    this.getGymPckgList({});
  }
  onSearch(event: any) {
    this.searchHome = event.target.value;
    this.getGymPckgList({});
  }
  searchHome: string = "";
  getGymPckgList(event: any) {
    if (!event?.pageChange) {
      this.page = 1;
      this.limit = 15;
    }
    let searchQuery = this.currentTabIndex === 0 ? this.searchHome : "";

    this.api
      .get1(
        `gymPkgMgmt/gymPkgs?page=${this.page}&limit=${this.limit}&search=${searchQuery}`
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.dataSource1 = new MatTableDataSource(
            res.data["GymPkgList"]
          );
          this.dataSource1.paginator = this.MatPaginator1;
          setTimeout(() => {
            this.MatPaginator1.length = res?.data.count;
            this.totalLength = res?.data.count;
            this.MatPaginator1.pageIndex = this.page - 1;
          });
        },
        error: (err: any) => {
          console.log(err.error.message);
        },
      });
  }
  currentTabIndex: number = 0;
  totalLength: any;
  onPageChange(event: any): void {
    // this.getpckgData({})
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getGymPckgList({
      pageChange: true,
    });
  }
  page: number = 1;
  limit: number = 5;

  changeStatus(gymPkgId: string, isBlocked: boolean): void {
    const payload = {
      gymPkgId,
      isBlocked: !isBlocked, // Reverse the logic as toggle indicates the opposite state
    };

    this.api.patch1("gymPkgMgmt/blockGymPkg", payload).subscribe({
      next: (response: any) => {
        if (isBlocked == true) {
          this.toastr.success("Package Unblocked SuccessFully");
        } else {
          this.toastr.error("Package Blocked SuccessFully");
        }
        this.getGymPckgList({});
      },
      error: (err: any) => {
        console.error("Error updating status:", err.error.message);
        // Optionally, revert the toggle state or show an error message
      },
    });
  }
  goToEdit(id: any) {
    this.router.navigate(['/gym/gym-package-mgmt/edit-package'], {
      queryParams: { id: id }
    });
  }
  deleteSupp(id:any){
    this.api.delete1(`gymPkgMgmt/deleteGymPkg/${id}`).subscribe({
      next: (response: any) => {
     
          this.toastr.success("Gym Package Delete SuccessFully");
      
        this.getGymPckgList({});
      },
      error: (err: any) => {
        console.error("Error Delete status:", err.error.message);
        // Optionally, revert the toggle state or show an error message
      },
    });
  }

    deleteDialog(
      enterAnimationDuration: string,
      exitAnimationDuration: string,
      element: any
    ): void {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: "400px",
        height: "auto",
        maxHeight: "100vh",
        maxWidth: "90vw",
        panelClass: "layout-dialog",
        enterAnimationDuration,
        exitAnimationDuration,
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result != 'no') {
          this.deleteSupp(element);
        }
      });
    }
}
