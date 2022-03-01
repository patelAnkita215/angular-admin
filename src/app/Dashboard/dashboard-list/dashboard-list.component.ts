import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { AdminService } from '../admin.service';


@Component({
  selector: 'app-business-users',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
})
export class DashboardListComponent implements OnInit {

  adminDashboard: any;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private titleService: Title,
    private route: ActivatedRoute,
  ) {
    this.titleService.setTitle('Dashboard | Payville - Admin');
  }

  ngOnInit(): void {

    this.getAdminDashboard();
   
  }

  getAdminDashboard() {
    this.spinner.show();
    this.adminService.getDashboardAdmin().subscribe(
      (resp: any) => {
        this.spinner.hide();

        console.log('dashboard',resp);
        if (resp.Status == 1) {
          this.adminDashboard = resp.Dashboard;

        } else {
          this.toastrService.error(resp.Message);
        }

      }, (error: any) => {
        this.spinner.hide();
        console.log(error);

        this.toastrService.error(error.message);

      })
  }  
}
