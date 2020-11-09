import { Component, OnInit } from '@angular/core';
import { validateEventsArray } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  fpForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  getError(e) {
    return (this.fpForm.get(e).touched || this.fpForm.get(e).dirty) && this.fpForm.get(e).errors
  }

  ngOnInit(): void {
    this.fpForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_c: ['', [Validators.required]]
    });   
  }

  forgotPassword() {

  }
}
