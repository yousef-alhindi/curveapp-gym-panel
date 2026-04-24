import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { WebStorageService } from "src/app/service/web-storage.service";

@Component({
  selector: "app-create-business-profile",
  templateUrl: "./create-business-profile.component.html",
  styleUrls: ["./create-business-profile.component.css"],
})
export class CreateBusinessProfileComponent implements OnInit {
  foodItemChange: any = "";
  restaurantCategoryId: any = "";
  typeList: any[] = [];
  selectedCategory: any;
  constructor(
    private api: ApiService,
    private router: Router,
    private toaster: ToastrService,
    private session: WebStorageService
  ) {}
  get f(){
    return this.BusinessProfileForm.controls;
  }
  submitted:boolean=false
  ngOnInit() {
    this.restaurantCategoryId = JSON.parse(
      this.session.getSessionStorage("curve-restaurants") || ""
    );
    // this.getAllResturantCategory();

    if(this.restaurantCategoryId?.email){
      // this.BusinessProfileForm.addControl('countryCode', new FormControl("91", []));
      // this.BusinessProfileForm.addControl('mobileNumber', new FormControl('', [Validators.required, Validators.minLength(7)]));
      this.BusinessProfileForm.removeControl('email');
    // }else if(this.restaurantCategoryId?.mobileNumber){
    //   this.BusinessProfileForm.removeControl('countryCode');
    //   this.BusinessProfileForm.removeControl('mobileNumber');
    //   this.BusinessProfileForm.addControl('email', new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]));
    }
    if(this.restaurantCategoryId?.email ){
      // this.BusinessProfileForm.addControl('countryCode', new FormControl("91", []));
      // this.BusinessProfileForm.addControl('mobileNumber', new FormControl('', [Validators.required, Validators.minLength(7)]));
      this.BusinessProfileForm.addControl('email', new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]));
    }
    if(this.restaurantCategoryId) {
      this.BusinessProfileForm.patchValue({
        gymType: this.restaurantCategoryId?.gymType,
        name: this.restaurantCategoryId?.name,
        ownerName: this.restaurantCategoryId?.ownerName,
        // mobileNumber: this.restaurantCategoryId?.mobileNumber,
        email: this.restaurantCategoryId?.email
      })
    }
  }



  radioChange(event: any) {
    this.foodItemChange = event.value;
    console.log(this.foodItemChange)
  }

  selectedRes(event: any) {
    this.selectedCategory = event.value;
  }

  BusinessProfileForm: FormGroup = new FormGroup({
    gymType: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    ownerName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required,Validators.email]),
  });

  createBusinessProfile() {
    this.submitted=true
    // debugger
    if (this.BusinessProfileForm.invalid) {
      return;
    }
    return new Promise((reslove, reject) => {
      let data = this.BusinessProfileForm.value;
      // data.type = this.foodItemChange ? this.foodItemChange : 1;
      // data.type = this.selectedCategory;
      this.api.put("createBussinessProfile", data).subscribe({
        next: (res: any) => {
          reslove(res);
          this.session.setSessionStorage(
            "curve-restaurants",
            JSON.stringify(res.data)
          );
          this.toaster.success("Business profile created successfully!");
          this.router.navigateByUrl("/add-gym-location");
        },
        error: (err: any) => {
          reject(err.error);
        },
      });
    });
  }

  // getAllResturantCategory() {
  //   this.api.get1("category/cuisine/list").subscribe({
  //     next: (res: any) => {
  //       // this.typeList = res.data;
  //       this.typeList = res.data.getCuisine
  //       // (
  //       //   (item: any) => item.type !== "" && item.type !== null
  //       // );
  //     },
  //     error: (err: any) => {
  //       console.log(err.error);
  //     },
  //   });
  // }
}
