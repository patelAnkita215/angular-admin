import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router'; import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { UsersService } from '../users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any;
  p: number = 1;
  itemsPerPage: number = 25;
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
    this.getAllAstrologgers(0)

    // this.router.events.subscribe((event: Event) => {

    //   if (event instanceof NavigationEnd) {        
    //     console.log(event);
    //     this.route.queryParams
    //       .subscribe(params => {
    //         console.log(params.search);
    //         if (params.search) {
    //           this.usersService.searchUsers(params.search).subscribe((resp: any) => {
    //             this.users = resp.Users;
    //             this.totalUsers = resp.TotalUserCount
    //           })
    //         } else {
    //           this.getAllAstrologgers(0)
    //         }

    //       }
    //       );

    //   }

    // });

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
    this.usersService.getAllUsers(count).subscribe((resp: any) => {
      console.log(resp);
      this.users = resp.users;
      this.totalUsers = resp.usersCount
      this.spinner.hide();
    }, (error: any) => {
      this.toastrService.error(error.message);
      this.spinner.hide();
    });
  }
  navTo(id: number) {
    this.router.navigate(['dashboard/users/' + id]);
  }

  // async updateCharges(evalue: any, user: any) {
  //   console.log(user);
  //   if (evalue.target.value == 1) {

  //     const ipWalletCommissionPercentage = await Swal.fire({
  //       title: 'Update Wallet Commission in %',
  //       input: 'text',
  //       inputPlaceholder: 'Enter Wallet Commission in %',
  //       inputValue: user?.walletCommissionPercentage,
  //       confirmButtonText: 'Update',
  //       showCloseButton: true,

  //     }).then((confirmed: any) => {

  //       if (confirmed.isDismissed) {
  //         window.location.reload();
  //       }
  //       if (confirmed.isConfirmed) {
  //         if (isNaN(confirmed.value)) {
  //           alert('Invalid value');
  //           this.updateCharges(evalue, user);
  //           return;
  //         }
  //         if (confirmed.value > 100) {
  //           alert('Invalid value');
  //           this.updateCharges(evalue, user);
  //           return;
  //         }
  //         this.updateUserApi(user, 'WalletCommission', confirmed.value)
  //       }
  //       console.log(confirmed);

  //     })
  //   }
  //   if (evalue.target.value == 2) {

  //     const ipPayoutChargePercentage = await Swal.fire({
  //       title: 'Update Payout Charge in %',
  //       input: 'text',
  //       inputPlaceholder: 'Enter Payout Charge in %',
  //       inputValue: user?.payoutChargePercentage,
  //       confirmButtonText: 'Update',
  //       showCloseButton: true
  //     }).then((confirmed: any) => {

  //       console.log(confirmed);

  //       if (confirmed.isDismissed) {
  //         window.location.reload();
  //       }
  //       if (confirmed.isConfirmed) {
  //         if (isNaN(confirmed.value)) {
  //           alert('Invalid value');
  //           this.updateCharges(evalue, user);
  //           return
  //         }
  //         if (confirmed?.value > 100) {
  //           alert('Invalid value');
  //           this.updateCharges(evalue, user);
  //           return
  //         }
  //         this.updateUserApi(user, 'PayoutCharge', confirmed.value)
  //       }
  //       console.log(confirmed);

  //     })
  //   }

    // if (email) {
    //   Swal.fire(`Entered email: ${email}`)
    // }
  // }


  updateUserApi(user: any, whatToUpdate: any, val: any) {

    const payload: any = {}
    if (whatToUpdate == 'WalletCommission') {
      payload.walletCommissionPercentage = val;
    }
    if (whatToUpdate == 'PayoutCharge') {
      payload.payoutChargePercentage = val;
    }

    this.usersService.updateUserByUserId(user?.userId, payload).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      if (resp.Status == 1) {
        this.toastrService.success('User Details Updated');
        window.location.reload();
      }

    }, (error: any) => {
      this.toastrService.error(error.message);
      this.spinner.hide();
    });
  }

}
