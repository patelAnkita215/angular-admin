import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { UsersService } from '../users.service';


@Component({
  selector: 'app-business-users',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
})
export class DashboardListComponent implements OnInit {

  // userDashboard: any;
  // userId: number;


  constructor(
    private router: Router,
    private userService: UsersService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private titleService: Title,
    private route: ActivatedRoute,
  ) {
    this.titleService.setTitle('Dashboard | Payville - Admin');
    // this.userId = this.route.snapshot.params.id;
    // console.log(this.userId);

  }

  ngOnInit(): void {

    // this.getUserDashboard();
   
  }

  // getUserDashboard() {
  //   this.spinner.show();
  //   this.userService.getDashboardByUserId(this.userId).subscribe(
  //     (resp: any) => {
  //       this.spinner.hide();

  //       console.log(resp);
  //       if (resp.Status == 1) {
  //         this.userDashboard = resp.Dashboard;

  //       } else {
  //         this.toastrService.error(resp.Message);
  //       }

  //     }, (error: any) => {
  //       this.spinner.hide();
  //       console.log(error);

  //       this.toastrService.error(error.message);

  //     })
  // }
  
  
}
