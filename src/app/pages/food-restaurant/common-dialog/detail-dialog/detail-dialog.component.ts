import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.css']
})
export class DetailDialogComponent {

  restroData:any
  items:any 
  customizeArray:any[]=[]
  viewInstruction: boolean = false;
  gymDetails:any
  gymId:any
constructor( private api:ApiService, public dialogRef: MatDialogRef<DetailDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any){
    if(data.type == 2){
    this.gymId = data.element
    this.getgymDetails(this.gymId)
    }
    this.restroData = data?.restaurentCartId
  }
  ngOnInit(){
    if(this.restroData){
    this.items = this.restroData['items']
    this.customizeArray = this.items
    .map((item: any) => item.isCustomize ? item.customize : [])  // Extract customize arrays or empty
    .filter((customizeArray: any) => customizeArray.length > 0)  // Filter out empty arrays
    .flat();
    console.log(this.customizeArray)
    }
}
    getgymDetails(id:any){
      this.api.get1("subscriptions/" + id).subscribe({
   next:(res:any)=>{
    this.gymDetails = res.data
   }
      })
    }

}
