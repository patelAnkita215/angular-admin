import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AstrologerService } from '../astrologer.service';

@Component({
  selector: 'app-manage-astrologers',
  templateUrl: './manage-astrologers.component.html',
  styleUrls: ['./manage-astrologers.component.scss']
})
export class ManageAstrologersComponent implements OnInit {
  p: number = 1;
  astrologers: any;
  constructor(
    private router: Router,
    private astroService: AstrologerService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private titleService: Title

  ) {
    this.titleService.setTitle("Payville | Astro Graha");

  }

  ngOnInit(): void {


    this.getAllAstrologgers();
  }
  getAllAstrologgers() {
    this.spinner.show();
    this.astroService.getAllAstrologers().subscribe((resp: any) => {
      console.log(resp);
      this.astrologers = resp.Astrologers;

      this.spinner.hide();
    }, (error: any) => {
      this.toastrService.error(error.message);
      this.spinner.hide();
    });
  }

  navTo(id: number) {
    this.router.navigate(['dashboard/manage-astrologers/view/' + id])
  }

  statusChange(id: number, status: any) {
    console.log(id);
    console.log(status);
    if (status) {
      const payload = {
        AstrologerStatus: 1
      }
      this.astroService.editAstrologerByID(payload, id).subscribe((resp: any) => {
        if (resp.Status == 1) {
          this.toastrService.info('Status updated');
          this.getAllAstrologgers();
        } else {
          this.toastrService.error(resp.Message);
        }
      }, (error: any) => {
        this.toastrService.error(error.message);
      })
    } else {
      const payload = {
        AstrologerStatus: 0
      }
      this.astroService.editAstrologerByID(payload, id).subscribe((resp: any) => {
        if (resp.Status == 1) {
          this.toastrService.info('Status updated');
          this.getAllAstrologgers();
        } else {
          this.toastrService.error(resp.Message);
        }
      }, (error: any) => {
        this.toastrService.error(error.message);
      })
    }



  }


  approveAstrologer(id: number) {
    console.log(id);
    const payload = {
      AstrologerStatus: 1
    }
    this.astroService.editAstrologerByID(payload, id).subscribe((resp: any) => {
      if (resp.Status == 1) {
        this.toastrService.info('Astrologer approved');
        this.getAllAstrologgers();
      } else {
        this.toastrService.error(resp.Message);
      }
    }, (error: any) => {
      this.toastrService.error(error.message);
    })
  }
  hideActiveAstrologer(id: number, value: any) {
    console.log(id);
    console.log(value);

    const payload = {
      AstrologerStatus: value
    }

    this.astroService.editAstrologerByID(payload, id).subscribe((resp: any) => {
      if (resp.Status == 1) {
        this.toastrService.info(resp.Message);
        this.getAllAstrologgers();
      } else {
        this.toastrService.error(resp.Message);
      }
    }, (error: any) => {
      this.toastrService.error(error.message);
    })
  }

}
