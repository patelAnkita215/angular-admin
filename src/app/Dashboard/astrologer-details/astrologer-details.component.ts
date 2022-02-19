import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AstrologerService } from '../astrologer.service';

@Component({
  selector: 'app-astrologer-details',
  templateUrl: './astrologer-details.component.html',
  styleUrls: ['./astrologer-details.component.scss']
})
export class AstrologerDetailsComponent implements OnInit {
  AstrologerId: number;
  AstrologerDetails: any;
  AstrologerHistory: any;
  currentSection = 'details'
  p: number = 1;
  constructor(
    private router: Router,
    private astroService: AstrologerService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private titleService: Title

  ) {
    this.titleService.setTitle("Astrologers list | Astro Graha");

    this.AstrologerId = this.route.snapshot.params.id;
    console.log(this.AstrologerId);

  }

  ngOnInit(): void {
    this.getAllAstrologger();
    this.getAstrologerOrderHistory();
  }
  getAllAstrologger() {
    this.spinner.show();
    this.astroService.getAllAstrologerByID(this.AstrologerId).subscribe(
      (resp: any) => {
        this.spinner.hide();

        console.log(resp);
        if (resp.Status == 1) {

          this.AstrologerDetails = resp.AstrologerDetails
          this.titleService.setTitle(` ${this.AstrologerDetails.FirstName} | Astro Graha`);
        } else {
          this.toastrService.error(resp.Message);
        }

      }, (error: any) => {
        this.spinner.hide();
        console.log(error);

        this.toastrService.error(error.message);

      })
  }
  edit() {
    this.router.navigate(['dashboard/manage-astrologers/edit/' + this.AstrologerId])
  }

  getAstrologerOrderHistory() {
    
    this.spinner.show();
    this.astroService.getAstrologerOrderHistory(this.AstrologerId).subscribe(
      (resp: any) => {
        this.spinner.hide();

        console.log(resp);
        if (resp.Status == 1) {

          this.AstrologerHistory = resp.Orders;
        } else {
          this.toastrService.error(resp.Message);
        }

      }, (error: any) => {
        this.spinner.hide();
        console.log(error);

        this.toastrService.error(error.message);

      })
  }

  deleteAstrologer() {
    Swal.fire({

      title: 'Are you sure you want to delete this astrologer?',

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
        this.astroService.deleteAstrologer(this.AstrologerId).subscribe((resp: any) => {
          this.spinner.hide();
          if (resp.Status == 1) {
            console.log(resp);
            Swal.close();
            this.router.navigate(['dashboard/manage-astrologers'])
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

}
