import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router'; import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.scss']
})
export class UserRequestsComponent implements OnInit {

  users: any;
  currentSection = 2

  p: number = 1;
  itemsPerPage: number = 20;
  totalUsers: number = 0
  constructor(
    private router: Router,
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private titleService: Title,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle("Users | Payville - Admin");

    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        // this.currentRoute = event.url;          
        console.log(event);
        this.route.queryParams
          .subscribe(params => {
            console.log(params.search);
            if (params.search) {
              this.usersService.searchUsers(params.search).subscribe((resp: any) => {
                this.users = resp.Users;
                this.totalUsers = resp.TotalUserCount
              })
            } else {
              this.getAllAstrologgers(0)
            }

          }
          );

      }

    });

  }

  ngOnInit(): void {

  }
  pageChanged(event: any) {
    this.p = event
    console.log(event);
    if (event == 1) {
      this.getAllAstrologgers(0)
    } else {
      const count = (event - 1) * this.itemsPerPage
      this.getAllAstrologgers(count)
    }
  }
  getAllAstrologgers(count: number) {
    this.spinner.show();
    this.usersService.getAllUserRequests(count, this.currentSection).subscribe((resp: any) => {
      console.log(resp);
      this.users = resp.Requests;
      this.totalUsers = resp.Total
      this.spinner.hide();
    }, (error: any) => {
      this.toastrService.error(error.message);
      this.spinner.hide();
    });
  }
  sectionChanged(section: number) {
    this.currentSection = section;
    this.p=1
    this.getAllAstrologgers(0)
  }
  navTo(id: number) {
    this.router.navigate(['dashboard/users/' + id])
  }


}
