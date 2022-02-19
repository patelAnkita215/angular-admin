import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AstrologerService } from '../astrologer.service';

@Component({
  selector: 'app-edit-astrologer',
  templateUrl: './edit-astrologer.component.html',
  styleUrls: ['./edit-astrologer.component.scss']
})
export class EditAstrologerComponent implements OnInit {

  AstrologerId: number;
  AstrologerDetails: any;
  astroEditForm: any;
  submitted = false;
  base64Img: any;

  allLocations = [
    'Andhra Pradesh', 'Assam', 'Arunachal Pradesh', 'Bihar', 'Goa', 'Gujarat', 'Jammu and Kashmir', 'Jharkhand', 'West Bengal', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland','New Delhi', 'Orissa', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu','Telangana', 'Tripura', 'Uttaranchal', 'Uttar Pradesh', 'Haryana', ' Himachal Pradesh', 'Chhattisgarh'
  ]
  allLanguages = ['English', 'Hindi', 'Malayalam', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi']
  allExpertise = ['Vedic Astrology', 'Kerala Astrology', 'Numerology', 'Prashna Chart', 'Vastu Shastra']

  dropdownSettings = {};
  dropdownSettings1 = {};

  imgUrl: any;
  @ViewChild('divClick') divClick: ElementRef | any;

  constructor(
    private router: Router,
    private astroService: AstrologerService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private titleService: Title

  ) {
    this.titleService.setTitle("Payville ");

    this.AstrologerId = this.route.snapshot.params.id;
    console.log(this.AstrologerId);

  }

  ngOnInit(): void {
    this.astroEditForm = this.fb.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      EmailID: ['', [Validators.required, Validators.email]],
      Location: [[], [Validators.required]],
      Languages: [[], [Validators.required]],
      Expertise: [[], [Validators.required]],
      Experience: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      MobileNumber: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      ProfilePic: [''],
      AstrologerStatus: [null],
      About_me: ['', [Validators.required]],
      Price: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      IsCallServiceProvided: [''],
      IsChatServiceProvided: ['']
    })

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      limitSelection: 5
    };
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.getAstrologger();
  }

  getAstrologger() {
    this.spinner.show();
    this.astroService.getAllAstrologerByID(this.AstrologerId).subscribe(
      (resp: any) => {
        this.spinner.hide();
        console.log(resp);
        if (resp.Status == 1) {
          this.AstrologerDetails = resp.AstrologerDetails;
          this.imgUrl = this.AstrologerDetails.ProfilePic;
          this.astroEditForm.patchValue({
            Price: this.AstrologerDetails.Price,
            AstrologerStatus: this.AstrologerDetails.AstrologerStatus,
            FirstName: this.AstrologerDetails.FirstName,
            LastName: this.AstrologerDetails.LastName,
            EmailID: this.AstrologerDetails.EmailID,
            Location: this.AstrologerDetails.Location,
            Languages: this.AstrologerDetails.Languages,
            Expertise: this.AstrologerDetails.Expertise,
            Experience: this.AstrologerDetails.Experience,
            MobileNumber: this.AstrologerDetails.MobileNumber,
            ProfilePic: this.AstrologerDetails.ProfilePic,
            About_me: this.AstrologerDetails.About_me,
            IsCallServiceProvided:this.AstrologerDetails.IsCallServiceProvided,
            IsChatServiceProvided:this.AstrologerDetails.IsChatServiceProvided
          }
          );
          console.log(this.astroEditForm.value.IsCallServiceProvided);
          
          // if(!this.AstrologerDetails.IsCallServiceProvided){
          //   this.astroEditForm.patchValue({
          //     IsCallServiceProvided :1
          //   })
          // };
          // if(!this.AstrologerDetails.IsChatServiceProvided){
          //   this.astroEditForm.patchValue({
          //     IsChatServiceProvided :1
          //   })
          // };
          console.log(this.astroEditForm.value.IsCallServiceProvided);

          

            setTimeout(() => {
              this.divClick.nativeElement.click();
            }, 1);

        } else {
          this.spinner.hide();
          this.toastrService.error(resp.Message);
        }

      }, (error: any) => {
        console.log(error);

        this.toastrService.error(error.message);

      })


  }




  get f() { return this.astroEditForm.controls; }

  edit() {
    this.submitted = true;
    console.log(this.astroEditForm);

    if (this.astroEditForm.invalid) {
      this.toastrService.error('Form not valid');
      return;
    }
    // if (this.astroEditForm.value.AstrologerStatus) {
    //   this.astroEditForm.value.AstrologerStatus = 1;
    // } else {
    //   this.astroEditForm.value.AstrologerStatus = 0;
    // }
    if (this.base64Img) {
      this.astroEditForm.value.ProfilePic = this.base64Img.split(',')[1];
    } else {
      this.astroEditForm.value.ProfilePic = this.imgUrl;
    }
    this.astroEditForm.value.AstrologerStatus = parseInt(this.astroEditForm.value.AstrologerStatus)
    this.astroEditForm.value.IsCallServiceProvided = parseFloat(this.astroEditForm.value.IsCallServiceProvided);
    this.astroEditForm.value.IsChatServiceProvided = parseFloat(this.astroEditForm.value.IsChatServiceProvided);

    console.log(this.astroEditForm.value);
    this.astroEditForm.value.Price = parseInt(this.astroEditForm.value.Price)
    this.spinner.show();

    this.astroService.editAstrologerByID(this.astroEditForm.value, this.AstrologerId).subscribe((resp: any) => {
      this.spinner.hide();

      if (resp.Status == 1) {
        this.router.navigate(['dashboard/manage-astrologers/view/' + this.AstrologerId])
      } else {
        this.toastrService.error(resp.Message);
      }
    }, (error: any) => {
      this.spinner.hide();
      this.toastrService.error(error.message);
    })
  }

  profilePicture(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.base64Img = reader.result;
    };
    console.log(this.base64Img);

  }

}
