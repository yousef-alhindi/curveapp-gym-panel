import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: "app-edit-package",
  templateUrl: "./edit-package.component.html",
  styleUrls: ["./edit-package.component.css"],
})
export class EditPackageComponent {
  pckgForm: FormGroup;
  id:any
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private api: ApiService,
    private toastr: ToastrService, private route:ActivatedRoute
  ) {
    this.pckgForm = this.fb.group({
      name: ["", Validators.required],
      gymPkgId: [""],
      durations: this.fb.array([this.createDurationGroup()]),
      gender: ["", Validators.required],
      description: ["", Validators.required],
      termAndCond: ["", Validators.required],
      image: ["", Validators.required],
    });
  }

  createDurationGroup() {
    return this.fb.group({
      duration: ["", Validators.required],
      price: [null, Validators.required],
    });
  }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.id = params['id']; // 'id' is the query parameter
      console.log('ID from Query Params:', this.id);
    });
    if(this.id){
      this.editData =true
      this.getGymById(this.id)
    }
  }
  get durations() {
    return this.pckgForm.get("durations") as FormArray;
  }

  addFields() {
    if (this.durations.length < 4) {
      this.durations.push(this.createDurationGroup());
    }
  }
  
  removeField(index: number) {
    if (this.durations.length > 1) {
      this.durations.removeAt(index);
    }
  }

  getGymById(id:any){
    this.api.get1('gymPkgMgmt/viewGymPkg/'+id).subscribe({
      next:(res:any)=>{
       this.editData = res.data
       this.patchFormData();
      }
    })
  }

  patchFormData() {
    this.profileImage = this.editData.image
    this.pckgForm.patchValue({
      name: this.editData.name,
      gender: this.editData.gender,
      image:this.editData.image,
      description: this.editData.description,
      termAndCond: this.editData.termAndCond,
    });
    this.durations.clear();
    this.editData?.durations?.forEach((duration: any) => {
      this.durations.push(
        this.fb.group({
          duration: [duration.duration, Validators.required],
          price: [duration.price, Validators.required],
        })
      );
    });
  }
  submitted: Boolean = false;
  get f(){
    return this.pckgForm.controls;
  }
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.uploadProfileImage = file;

      if (!file.type.startsWith("image/")) {
        // Check if the selected file is not an image
        event.target.value = null; // Reset the file input
        this.toastr.error("Please select a PNG, JPG, JPEG");
        return;
      }

      const maxSizeInMB = 2;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        event.target.value = null;
        this.toastr.error(`Max ${maxSizeInMB} MB is allowed.`);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file); // Read file as data URL
      reader.onload = (event: any) => {
        this.url = event.target.result; // Set the image URL for preview
        this.uploadImage(this.uploadProfileImage); // Call upload image function
      };
    }
  }
  profileImage: any;
  imggChange: boolean = false;
  uploadProfileImage: File | null = null;
  url: any;
  uploadImage(img: File | null) {
    if (img) {
      this.imggChange = true;
      const data = new FormData();
      data.append("upload_gym_file", img);
      this.api.post("uploadFile", data).subscribe((data: any) => {
        this.profileImage = data.data; // Update profile image on success
      });
    }
  }

  editData: any;
  submit() {
    this.submitted =true;
    if(this.pckgForm.value.name == '' || this.pckgForm.value.gender == '' || this.profileImage == '' || this.pckgForm.value.description == '' ||this.pckgForm.value.termAndCond == '' ){
      return
    }
    const formValue = this.pckgForm.value;
   formValue.image =this.profileImage
    formValue.durations = formValue.durations.map((durationObj: any) => ({
      ...durationObj,
      duration: parseInt(durationObj.duration, 10),
      price: parseInt(durationObj.price, 10),
    }));

    if (this.editData) {
      // Call edit API if editData exists
      formValue.gymPkgId = this.editData._id;
      this.api.patch1(`gymPkgMgmt/editGymPkg`, formValue).subscribe({
        next: (response: any) => {
          this.toastr.success("Package Updated Successfully!");
          this.router.navigate(['/gym/gym-package-mgmt'])
        },
        error: (error: any) => {
          this.toastr.error(
            error.error.message ? error.error.message : "Error Updating Package"
          );
          console.error("Error updating package", error);
        },
      });
    } else {
      this.api.post1("gymPkgMgmt/addGymPkg", formValue).subscribe({
        next: (response: any) => {
          this.toastr.success("Package Added!");
          console.log("Package created successfully", response);
          this.router.navigate(['/gym/gym-package-mgmt'])
        },
        error: (error: any) => {
          console.error("Error creating package", error);
          this.toastr.error(
            error.error.message ? error.error.message : "Error Adding Package"
          );
        },
      });
    }
  }
}
