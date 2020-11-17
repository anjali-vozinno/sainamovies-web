import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder, public dataService: DataService, private router: Router) { }

  loginError(e) {
    return (this.loginForm.get(e).touched || this.loginForm.get(e).dirty) && this.loginForm.get(e).errors
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      psw: ['', [Validators.required]]
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.dataService.login(this.loginForm.value.email, this.loginForm.value.psw)
    }
    else {
      alert("form invalid")
      // swal("Enter a valid username and password");
    }
  }


}
