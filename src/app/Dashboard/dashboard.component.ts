import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from './admin.service';
import { AstrologerService } from './astrologer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showEditLogout = false;
  adminDetails: any;
  constructor(
    private router: Router,
    private adminService: AdminService,
    private astroService: AstrologerService,
    private route: ActivatedRoute
  ) {
    this.getAdminDetails()


  }

  ngOnInit(): void {

  }
  logout() {
    if(confirm('Are you sure want to delete?')){

      localStorage.clear();
      this.router.navigate(['auth/login']);
    }
  }
  editAdmin() {
    this.showEditLogout = false;
    this.router.navigate(['dashboard/edit-admin']);
  }
  getAdminDetails() {
    // this.adminService.getAdminDetails().subscribe((resp: any) => {
    //   console.log(resp);
    //   this.adminDetails = resp.AdminDetails;
    // })
  }
  search(searchItem: any) {
    const url = this.router.url.split('?')[0].split('/').pop();
    console.log(url);
    if (url == "users") {
      this.router.navigate(['/dashboard/users'], { queryParams: { search: searchItem }, queryParamsHandling: 'merge' });

      // this.astroService.searchUsers(searchItem).subscribe((resp: any) => {
      //   console.log(resp);

      // })
    }
    if (url == 'manage-astrologers') {
      this.astroService.searchAstrologers(searchItem).subscribe((resp: any) => {
        console.log(resp);

      })
    }
    console.log(searchItem);
  }
}
