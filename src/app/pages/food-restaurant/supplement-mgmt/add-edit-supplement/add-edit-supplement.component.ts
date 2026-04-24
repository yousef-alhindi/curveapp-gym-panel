import { Component } from '@angular/core';

@Component({
  selector: 'app-add-edit-supplement',
  templateUrl: './add-edit-supplement.component.html',
  styleUrls: ['./add-edit-supplement.component.css']
})
export class AddEditSupplementComponent {
  imageUrl: string = '';
  imageUrl1: string = '';
  imageUrl2: string = '';
  imageUrl3: string = '';
  imageUrl4: string = '';





  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imageUrl = '';
  }

  onFileSelected1(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl1 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage1(): void {
    this.imageUrl1 = '';
  }

  onFileSelected2(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl2 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage2(): void {
    this.imageUrl2 = '';
  }


  onFileSelected3(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl3 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage3(): void {
    this.imageUrl3 = '';
  }


  onFileSelected4(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl4 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage4(): void {
    this.imageUrl4 = '';
  }


  
}
