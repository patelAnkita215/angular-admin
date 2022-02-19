import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isForgotPage = false;
  loginForm: any;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      emailId: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }
  login() {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      return
    }

    this.authService.adminLogin(this.loginForm.value).subscribe((resp: any) => {
      console.log(resp);
      if (resp.Status == 1) {
        localStorage.setItem('AdminUserID', resp.AdminUserID);
        localStorage.setItem('isAdminLogin', '1');
        localStorage.setItem('Token' , resp.Token)
        this.router.navigate(['/dashboard'])

      } else {
        this.toastrService.error(resp.Message);
      }

    }, (error: any) => {
      console.log(error);
      
      this.toastrService.error(error?.error?.Message);
    })
  }

}
