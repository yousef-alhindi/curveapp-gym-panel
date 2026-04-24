import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { AddDialogComponent } from "../common-dialog/add-dialog/add-dialog.component";
import { DeleteDialogComponent } from "../common-dialog/delete-dialog/delete-dialog.component";
import { DescriptionViewDialogComponent } from "./description-view-dialog/description-view-dialog.component";
import { ImageViewDialogComponent } from "./image-view-dialog/image-view-dialog.component";
import { DeliveryChargesComponent } from "./delivery-charges/delivery-charges.component";

export interface PeriodicElement1 {
  s_no: number;
  supplement_type: string;
  name: string;
  brand_name: string;
  created:string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
 {s_no:1,supplement_type:'Lorem',name:'Lorem',brand_name:'Lorem',created:'Lorem'}
];
@Component({
  selector: 'app-supplement-mgmt',
  templateUrl: './supplement-mgmt.component.html',
  styleUrls: ['./supplement-mgmt.component.css']
})
export class SupplementMgmtComponent {

  displayedColumns1: string[] = [
    "s_no",
    "supplement_type",
    "name",
    "brand_name",
    "size",
    "description",
    "images",
    "created",
    "action",
  ];
  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
  }

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router
  ) {}
  ngOnInit() {
   
  }

  chargesDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(DeliveryChargesComponent, {
      width: "700px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  descriptionView(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(DescriptionViewDialogComponent, {
      width: "600px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  viewImg(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(ImageViewDialogComponent, {
      width: "800px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  deleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteDialogComponent, {
      width: "400px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration
      
    })

  }

}
