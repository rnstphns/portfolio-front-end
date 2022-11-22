import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  template: `
    <label for="contact-form"></label>
        <form [formGroup]="contactForm" (ngSubmit)="submitForm()" class="form">
        <div class="grid grid-cols-2">
          <div class="input-label-pair">
            <label for="title">Title*</label>
            <!-- <span *ngIf="!contactForm.get('MessageTitle')?.valid && contactForm.get('MessageTitle')?.touched" class="alert">Please enter a title</span>  -->
            <input formControlName="MessageTitle" type="text" placeholder = "Title*" id="title">
          </div>
          <div class="input-label-pair">
            <label for="name">Name*</label>
            <!-- <span *ngIf="!contactForm.get('Name')?.valid && contactForm.get('Name')?.touched" class="alert">Please enter a name</span>  -->
            <input formControlName="GuestName" type="text" placeholder = "Name*" id="name">
          </div>
          <div class="input-label-pair">
            <label for="email">Email*</label>
            <!-- <span *ngIf="!contactForm.get('Email')?.valid && contactForm.get('Email')?.dirty" class="alert">Email is not valid</span>  -->
            <input formControlName="Email" type="email" placeholder = "Email*" id = "email">
          </div>
          <div class="input-label-pair">
            <label for="phone">Phone Number</label>
            <input formControlName="Phone" type="text" placeholder = "Phone Number" id="phone">
          </div>
        </div>
          <div class="flex flex-col"> <textarea formControlName="Message" type="text" placeholder = "Message*" class="message-field" id="message"></textarea>
          <span *ngIf="!contactForm.get('Message')?.valid && contactForm.get('Message')?.touched" class="alert">Please send me a message! (if you want to)</span> 
        </div>
          <div class="flex flex-col"> 
            <button [disabled]="!contactForm.valid" class="text-white bg-[slategray] rounded font-bold text-base sm:text-lg" type = "submit">Submit</button>
</div>
      </form>
    <span *ngIf="messageSent">Message successfully sent!</span>
  `,
  styleUrls: ['../../styles.css']
})
export class ContactFormComponent {

  contactForm!: FormGroup;
  apiURL: string = "https://csj7tgphj7.execute-api.us-east-1.amazonaws.com/contact";
  messageSent: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = fb.group({
      MessageTitle: ['', Validators.required],
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      Phone: ['', Validators.pattern('^(\(\d{3}\)|\d{3})-?\d{3}-?\d{4}$')],
      Message: ['', Validators.required],
      GuestName: ['', Validators.required]
    })
  }

  submitForm() {
    if (this.contactForm.valid) {
      const formValue = JSON.stringify(this.contactForm.getRawValue())
      this.http.post(this.apiURL, formValue).subscribe(res => {
          if(res === 'Success') this.messageSent = true;
        }
      );
    }
  }
}
