import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-wallet-transactions',
  templateUrl: './wallet-transactions.component.html',
  styleUrls: ['./wallet-transactions.component.scss']
})
export class WalletTransactionsComponent implements OnInit {
  p: number = 1;
  transactions: any;
  constructor(
    private titleService: Title,
    private userService: UsersService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService

  ) {
    this.titleService.setTitle("Wallet Transactions | Payville");
    this.getWalletTransactions()
  }

  ngOnInit(): void {
  }
  getWalletTransactions() {
    this.spinner.show();
    this.userService.getWalletTransactions().subscribe((resp: any) => {
      this.spinner.hide();
      console.log(resp);
      this.transactions = resp.Wallet_Transactions;

    }, (error: any) => {
      this.toastrService.error(error.message);
      this.spinner.hide();
    })
  }

}


