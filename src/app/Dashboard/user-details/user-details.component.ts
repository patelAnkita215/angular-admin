import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UsersService } from '../users.service';
// import { count } from 'console';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userId: number;
  userDetails: any;
  userTransactions: any;
  startDate: any;
  endDate: any;
  userDashboard: any;
  userSetting: any;
  showSection = "USER";
  settingUserForm: any;
  userTransactionsPopup: any;
  referralUser: any;
  getOffset: number = 0;

  showpopup: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private titleService: Title

  ) {
    this.titleService.setTitle("Payville - Admin");

    this.userId = this.route.snapshot.params.id;
    console.log(this.userId);

  }

  ngOnInit(): void {
    this.settingUserForm = this.fb.group({
      PayoutBlocked: [''],
      walletCommissionPercentage: [''],
      payoutChargeType: [''],
      payoutChargeAmount: [''],
      payoutChargePercentage: [''],
      monthlyBusinessCommitment: [''],
      // allowCommission: [''],
      userBlock: [''],

    });

    this.getUser();
    this.getUserTransactions();
    this.getUserDashboard();
    this.getUserSetting();
    this.getReferredUser();
  }
  getUser() {
    this.spinner.show();
    this.userService.getUserByID(this.userId).subscribe(
      (resp: any) => {
        this.spinner.hide();

        console.log(resp);
        if (resp.Status == 1) {
          this.userDetails = resp.UserDetails;
          this.titleService.setTitle(` ${this.userDetails.firstName} | Payville - Admin`);

        } else {
          this.toastrService.error(resp.Message);
        }

      }, (error: any) => {
        this.spinner.hide();
        console.log(error);

        this.toastrService.error(error.message);

      })
  }
  getUserTransactions() {
    this.spinner.show();
    this.userService.getWalletTransactionsByUserId(this.userId).subscribe(
      (resp: any) => {
        this.spinner.hide();

        console.log("wallet transction",resp);
        if (resp.Status == 1) {
          this.userTransactions = resp.WalletTransactions;

        } else {
          this.toastrService.error(resp.Message);
        }

      }, (error: any) => {
        this.spinner.hide();
        console.log(error);

        this.toastrService.error(error.message);

      })
  }

  getUserDashboard() {
    this.spinner.show();
    this.userService.getDashboardByUserId(this.userId).subscribe(
      (resp: any) => {
        this.spinner.hide();

        console.log(resp);
        if (resp.Status == 1) {
          this.userDashboard = resp.Dashboard;

        } else {
          this.toastrService.error(resp.Message);
        }

      }, (error: any) => {
        this.spinner.hide();
        console.log(error);

        this.toastrService.error(error.message);

      })
  }


  deleteUser() {
    Swal.fire({

      title: 'Are you sure you want to delete this user?',

      // text: 'You will not be able to recover this file!',

      // icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Delete',
      confirmButtonColor: '#EE7326',

      cancelButtonText: 'Cancel',
      // cancelButtonColor: '#ffffff',


    }).then((result) => {

      if (result.value) {
        this.spinner.show();
        this.userService.deleteUser(this.userId).subscribe((resp: any) => {
          this.spinner.hide();
          if (resp.Status == 1) {
            console.log(resp);
            Swal.close();
            this.router.navigate(['dashboard/users'])
          } else {
            this.toastrService.error(resp.Message);
          }

        }, (error: any) => {
          this.spinner.hide();
          this.toastrService.error(error.message);
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {



      }

    })

  }

  filterByDate() {
    if (new Date(this.startDate) > new Date(this.endDate)) {
      alert('Start date is not more than end date');
      return
    }
    console.log(this.startDate);
    this.spinner.show();
    const payload = {
      fromDate: this.startDate,
      toDate: this.endDate
    }
    this.userService.getTransactionsByUserIdDateFilter(this.userId, payload).subscribe((resp: any) => {


      this.spinner.hide();
      console.log(resp);
      this.userTransactions = resp.WalletTransactions

    }, (error: any) => {
      this.toastrService.error(error.message);
      this.spinner.hide();
    })

  }
// setting tab
  getUserSetting() {
    this.spinner.show();
    this.userService.getUserByIdSetting(this.userId).subscribe((resp: any) => {
        this.spinner.hide();
        console.log(resp);
        if (resp.Status == 1) {
          this.userSetting = resp.UserDetails;
          this.settingUserForm.patchValue({
            PayoutBlocked: this.userSetting.isPayoutBlocked,
            walletCommissionPercentage: this.userSetting.walletCommissionPercentage,
            payoutChargeType: this.userSetting.payoutChargeType,
            payoutChargeAmount: this.userSetting.payoutChargeAmount,
            payoutChargePercentage: this.userSetting.payoutChargePercentage,
            monthlyBusinessCommitment: this.userSetting.monthlyBusinessCommitment,
            // allowCommission: this.userSetting.allowCommission,
            userBlock: this.userSetting.isBlocked,
            
              })

        } else {
          this.toastrService.error(resp.Message);
        }

      }, (error: any) => {
        this.spinner.hide();
        console.log(error);

        this.toastrService.error(error.message);

    })
  }

  settingUser() {
    const setting = this.settingUserForm.value;
    console.log('this is', setting);
    this.userService.updateUserByIdSetting(this.userId, setting).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      if (resp.Status == 1) {
        this.toastrService.success('Setting Details Updated');
        window.location.reload();
      }

    }, (error: any) => {
      this.toastrService.error(error.message);
      this.spinner.hide();
    });
    console.log(this.settingUserForm.value);
  }

  // transaction detail popup
  showTransactionModal(event:any,data:any){
    console.log("event dataa",data)
    this.showpopup = !this.showpopup;

    this.userService.getTransactionsPopupByID(data.wallet_transactionId).subscribe(
      (resp: any) => {
        this.spinner.hide();

        console.log(resp);
          this.userTransactionsPopup = resp.walletTransaction;

      }, (error: any) => {
        this.spinner.hide();
        console.log(error);

        this.toastrService.error(error.message);

      })
  }
  close(){
    this.showpopup = !this.showpopup;
  }
  open() {
    window.open('userTransactionsPopup?.InvoiceFile', '_blank')
  }

  // referred user tab
  getReferredUser() {
    this.spinner.show();
    const count = this.getOffset;
    this.userService.getReferredUser(this.userId,count).subscribe(
      (resp: any) => {
        this.spinner.hide();

        console.log(resp);
        if(resp.Status==1) {
          this.referralUser = resp.referralUser;
        }

      }, (error: any) => {
        this.spinner.hide();
        console.log(error);

        this.toastrService.error(error.message);

      })
  }
}
