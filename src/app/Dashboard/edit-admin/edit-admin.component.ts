import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit {
  editAdminForm: any;
  passwordChangeForm: any;
  submitted = false;
  submittedPassword = false;
  isMyAccount = true;
  AdminDetails: any;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.editAdminForm = this.fb.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      EmailID: ['', [Validators.required, Validators.email]],
      MobileNumber: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
    });
    this.getAdminDetails();

    this.passwordChangeForm = this.fb.group({
      CurrentPassword: ['', [Validators.required]],
      NewPassword: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
    })
  }
  get f() { return this.editAdminForm.controls; }
  get g() { return this.passwordChangeForm.controls; }
  getAdminDetails() {
    // this.spinner.show();
    // this.adminService.getAdminDetails().subscribe((resp: any) => {
    //   this.spinner.hide();
    //   console.log(resp);
    //   this.AdminDetails = resp.AdminDetails;
    //   this.editAdminForm.patchValue({
    //     FirstName: this.AdminDetails.FirstName,
    //     LastName: this.AdminDetails.LastName,
    //     MobileNumber: this.AdminDetails.MobileNumber,
    //     EmailID: this.AdminDetails.EmailID
    //   })
    // }, (error: any) => {
    //   this.toastrService.error(error.message);
    // })
  }
  editAdmin() {
    this.submitted = true;
    if (this.editAdminForm.invalid) {
      this.toastrService.error('Details not valid');
      return
    }
    console.log(this.editAdminForm);
    this.spinner.show();
    this.adminService.updateAdminDetails(this.editAdminForm.value, this.AdminDetails.AdminUserID).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      if (resp.Status == 1) {
        this.toastrService.success(resp.Message);
        window.location.reload();
      } else {
        this.toastrService.warning(resp.Message);
      }
    }, (error: any) => {
      this.spinner.hide();
      this.toastrService.error(error.message);
    })
  }
  changePassword() {
    this.submittedPassword = true;
    if (this.passwordChangeForm.value.NewPassword.length < 6) {
      this.toastrService.error('New password should be minimum 6 characters ');
      return
    }
    if (this.passwordChangeForm.value.NewPassword != this.passwordChangeForm.value.ConfirmPassword) {
      this.toastrService.error('New password and Confirm password must match');
      return
    }
    console.log(this.passwordChangeForm);
    this.spinner.show();
    this.adminService.changePassword(this.passwordChangeForm.value, this.AdminDetails.AdminUserID).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      if (resp.Status == 1) {
        this.toastrService.success(resp.Message);

      } else {
        this.toastrService.warning(resp.Message);
      }
    }, (error: any) => {
      console.log(error.error.message);
      
      this.spinner.hide();
      if(error.error){
        this.toastrService.error(error.error.message);
      }else{
        this.toastrService.error(error.message);
      }
        
    })
  }
}
