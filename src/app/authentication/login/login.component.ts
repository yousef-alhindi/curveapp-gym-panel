import { Component, OnInit } from "@angular/core";
import { EmailValidator, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatCheckbox, MatCheckboxChange } from "@angular/material/checkbox";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { WebStorageService } from "src/app/service/web-storage.service";
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  submitted: Boolean = false;
  checkedMessage: any;
  termsBoolean: Boolean = false;
  onCountryChange: any;
   lat: any;
	 lng: any;
	location: any;
	latitude: any;
	longitude: any;
	zoom: any;
  objectValue:any
  checkPhone: boolean =true;
  checkEmail: boolean =false;

	private geoCoder!: google.maps.Geocoder;
	postal: any;
	address: any;
  telInputObject(obj: any) {
    console.log(obj);
    obj.setCountry("in");
  }

  constructor(
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
    private session: WebStorageService,
    private mapsAPILoader: MapsAPILoader
  ) {}
  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      // Initialize the geocoder
      this.geoCoder = new google.maps.Geocoder();
    
      // Get current location and set it
      this.getLocation().then((data: any) => {
      
        this.lat = data.lat;
        this.lng = data.lng;
      
  
        this.setCurrentLocation();
      });
      });
    this.toggleContactMethod();

  }

  loginForm: FormGroup = new FormGroup({
    lat: new FormControl("", []),
    long: new FormControl("", []),
    deviceType: new FormControl(2),
    contactMethod: new FormControl(1),
  });

  toggleContactMethod(): void {
    if (this.checkPhone) {
      this.loginForm.addControl('countryCode', new FormControl("91", []));
      this.loginForm.addControl('mobileNumber', new FormControl('', [Validators.required, Validators.minLength(7)]));
      this.loginForm.removeControl('email');
    } else {
      this.loginForm.removeControl('countryCode');
      this.loginForm.removeControl('mobileNumber');
      this.loginForm.addControl('email', new FormControl('', [Validators.required, Validators.email,]));
    }
  }

  loginCredential() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else if (!this.isPrivacy) {
      this.toaster.error('Please accept Terms & Conditions')
      return;
    }
    this.loginForm.patchValue({
      lat: this.lat,
      long: this.lng
    });
   
    let data = this.loginForm.value;
//     data.lat=28.6774022
// data.long= 77.1830131
    this.api.post("create", data).subscribe({
      next: (res: any) => {
        this.session.setSessionStorage(
          "curve-restaurants",
          JSON.stringify(res.data)
        );
        this.toaster.success(res.message);
        // this.router.navigate(['/otp'])
        console.log('HEEGGE',res);
        
        this.router.navigateByUrl('/otp')
      },
      error: (err: any) => {
        this,this.toaster.error(err.error.message);
      },
    });
  }


  get f(){
    return this.loginForm.controls;
  }
  commonFunctionForError(error: any) {
    if (this.submitted && this.loginForm.controls[error].errors) {
      return true;
    }
    return false;
  }

 
  isPrivacy : Boolean = false;
  toggleSelection(event: MatCheckboxChange) {
    this.isPrivacy = event.checked;
  }

  private setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddresss(this.latitude, this.longitude);
      });
    }
  }
  getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: any) => {
            if (position) {
              this.lat = position.coords.latitude;
              this.lng = position.coords.longitude;
              let returnValue = {
                lat: this.lat,
                lng: this.lng,
              };
              resolve(returnValue);
            }
          },
          (error: any) => reject(error)
        );
      } else {
        alert("Geolocation is not supported by this browser.");
        reject("Geolocation is not supported by this browser.");
      }
    });
  }
  getAddresss(latitude: any, longitude: any) {
    const latlng = { lat: latitude, lng: longitude };
    this.geoCoder.geocode({ location: latlng }, (results: any, status: any) => {
      if (status === "OK") {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          // console.log("Address:", this.address);
        } else {
          // console.log("No results found");
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
  }

  checkEmailAndPhone(event: any): void {
    if(event.target.value == 2){
      this.checkEmail = true;
      this.checkPhone = false;
    }else{
      this.checkEmail =false;
      this.checkPhone =true;
    }
    this.toggleContactMethod();

  }
  onSelectionChange(event: any): void {
    if (event.value === 'restaurant') {
      window.location.href = 'https://www.curveapp.co/restaurant-panel/login';
      //  window.location.href = 'http://15.184.173.61:3000/restaurant-panel/login';
    }
   else if (event.value === 'Supplement Store') {
      // window.location.href = 'http://15.184.173.61:3000/supplement-panel/login';
      window.location.href = 'https://www.curveapp.co/supplement-panel/login';
    }
   else if (event.value === 'Grocery') {
      // window.location.href = 'http://15.184.173.61:3000/supplement-panel/login';
      window.location.href = 'https://www.curveapp.co/grocery-panel/login';
    }
  }
}
