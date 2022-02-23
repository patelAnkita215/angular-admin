import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  p: number = 1;
  transactions: any;
  startDate: any;
  endDate: any;

  show: boolean = false;
  userTransactionsPopup: any;
  constructor(
    private titleService: Title,
    private userService: UsersService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService

  ) {
    this.titleService.setTitle("Transactions | Payville");
    this.getOrders()
  }

  ngOnInit(): void {
    console.log('trans');

  }
  getOrders() {
    this.spinner.show();
    const payload = {
      offset: 0
    }
    this.userService.getOrders(payload).subscribe((resp: any) => {


      this.spinner.hide();
      console.log(resp);
      this.transactions = resp.walletTransactions

    }, (error: any) => {
      this.toastrService.error(error.message);
      this.spinner.hide();
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
      offset: 0,
      fromDate: this.startDate,
      toDate: this.endDate
    }
    this.userService.getOrders(payload).subscribe((resp: any) => {


      this.spinner.hide();
      console.log(resp);
      this.transactions = resp.walletTransactions

    }, (error: any) => {
      this.toastrService.error(error.message);
      this.spinner.hide();
    })

  }

  // transaction detail popup
  showTransactionModal(event:any,data:any){
    console.log("event dataa",data)
    this.show = !this.show;

    this.userService.getTransactionsPopupByID(data.wallet_transactionId).subscribe(
      (resp: any) => {
        this.spinner.hide();

        console.log("my response",resp);
        if (resp.Status == 1) {
          this.userTransactionsPopup = resp.walletTransaction;

        } else {
          this.toastrService.error(resp.Message);
        }

      }, (error: any) => {
        this.spinner.hide();
        console.log(error);

        this.toastrService.error(error.message);

      })
  }
  close(){
    this.show = !this.show;
  }
  open() {
    window.open('userTransactionsPopup?.InvoiceFile', '_blank')
  }

}
