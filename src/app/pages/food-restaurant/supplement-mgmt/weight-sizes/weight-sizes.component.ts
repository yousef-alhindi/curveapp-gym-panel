import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";

export interface PeriodicElement1 {
  s_no: number;
  weight: string;
  quantity: string;
  price: string;
  price_selling:string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
 {s_no:1,weight:'Lorem',quantity:'Lorem',price:'Lorem',price_selling:'Lorem'},
 {s_no:1,weight:'Lorem',quantity:'Lorem',price:'Lorem',price_selling:'Lorem'},
 {s_no:1,weight:'Lorem',quantity:'Lorem',price:'Lorem',price_selling:'Lorem'},

];
@Component({
  selector: 'app-weight-sizes',
  templateUrl: './weight-sizes.component.html',
  styleUrls: ['./weight-sizes.component.css']
})
export class WeightSizesComponent {
  displayedColumns1: string[] = [
    "s_no",
    "weight",
    "quantity",
    "price",
    "price_selling",
    "action"
  ];
  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
  }

  constructor(
    public dialog: MatDialog,

    private router: Router
  ) {}
  ngOnInit() {
   
  }


}
