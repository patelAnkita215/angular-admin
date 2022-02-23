import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  ActivatedRoute,
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { UsersService } from '../users.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-business-users',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  // e: any;
  // users: any;
  // p: number = 1;
  // itemsPerPage: number = 25;
  // totalUsers: number = 0;
  submitted = false;
  form: any;
  // form: FormGroup;
  SettingDetails: any;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private titleService: Title,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.titleService.setTitle('Setting | Payville - Admin');

  }

  ngOnInit(): void {

    this.form = this._fb.group({
      rechargeLock: [''],
      payoutLock: [''],
      completeSystemLock: [''],
    });

    this.getSettingsDetail();
  }

  get f() {
    return this.form.controls;
  }

  getSettingsDetail() {
    this.adminService.getSettingsDetails().subscribe(
      (resp: any) => {
        this.SettingDetails = resp.Settings;
        this.form.patchValue({
          rechargeLock: this.SettingDetails.rechargeLock,
          payoutLock: this.SettingDetails.payoutLock,
          completeSystemLock: this.SettingDetails.completeSystemLock,
        });
      },
      (error: any) => {
        this.toastrService.error(error.message);
      }
    );
  }

  settingSubmit() {
    this.submitted = true;
    this.form.value.rechargeLock = parseInt(this.form.value.rechargeLock)
    this.form.value.payoutLock = parseInt(this.form.value.payoutLock)
    this.form.value.completeSystemLock = parseInt(this.form.value.completeSystemLock)

    this.spinner.show();
    this.adminService.updateSettingsDetails(this.form.value).subscribe(
      (resp: any) => {
        console.log(resp);
        this.toastrService.success('Setting Details Updated');
        window.location.reload();
        console.log(this.form.value);

      },
      (error: any) => {
        this.spinner.hide();
        this.toastrService.error(error.message);
      }
    );
  }
}
