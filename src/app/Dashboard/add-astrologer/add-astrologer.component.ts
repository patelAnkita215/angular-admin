import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AstrologerService } from '../astrologer.service';

import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-add-astrologer',
  templateUrl: './add-astrologer.component.html',
  styleUrls: ['./add-astrologer.component.scss']
})
export class AddAstrologerComponent implements OnInit {
  base64Img: any;
  astroAddForm: any;
  submitted = false;
  allLocations = [
    'Andhra Pradesh', 'Assam', 'Arunachal Pradesh', 'Bihar', 'Goa', 'Gujarat', 'Jammu and Kashmir', 'Jharkhand', 'West Bengal', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland','New Delhi', 'Orissa', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu','Telangana', 'Tripura', 'Uttaranchal', 'Uttar Pradesh', 'Haryana', ' Himachal Pradesh', 'Chhattisgarh'
  ]
  allLanguages = ['English', 'Hindi', 'Malayalam', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi']
  allExpertise = ['Vedic Astrology', 'Kerala Astrology', 'Numerology', 'Prashna Chart', 'Vastu Shastra']

  dropdownSettings = {};
  dropdownSettings1 = {};
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private astroService: AstrologerService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private titleService: Title

  ) {
    this.titleService.setTitle("Add Astrologer | Astro Graha");
  }

  ngOnInit(): void {
    this.astroAddForm = this.fb.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      EmailID: ['', [Validators.required, Validators.email]],
      Location: [[], [Validators.required]],
      Languages: [[], [Validators.required]],
      Expertise: [[], [Validators.required]],
      Experience: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      MobileNumber: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      ProfilePic: [''],
      About_me: ['', [Validators.required]],
      Price: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      IsCallServiceProvided: [1],
      IsChatServiceProvided: [1]
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
  get f() { return this.astroAddForm.controls; }
  addAstrologer() {
    this.submitted = true;

    console.log(this.astroAddForm);
    if (this.astroAddForm.invalid) {
      this.toastrService.error('Form not valid');
      return;
    }
    this.astroAddForm.value.Price = parseFloat(this.astroAddForm.value.Price);
    this.astroAddForm.value.IsCallServiceProvided = parseFloat(this.astroAddForm.value.IsCallServiceProvided);
    this.astroAddForm.value.IsChatServiceProvided = parseFloat(this.astroAddForm.value.IsChatServiceProvided);
    
    console.log(this.base64Img);

    if (this.base64Img) {
      this.astroAddForm.value.ProfilePic = this.base64Img.split(',')[1];
    } else {
      this.astroAddForm.value.ProfilePic = 'NA';
    }
    this.spinner.show();
    this.astroService.addAstrologer(this.astroAddForm.value).subscribe((resp: any) => {
      this.spinner.hide();
      console.log(resp);
      if (resp.Status == 1) {
        this.router.navigate(['dashboard/manage-astrologers'])
      } else {
        this.toastrService.error(resp.Message);
      }
    }, (error: any) => {
      this.spinner.hide();
      this.toastrService.error(error.message);
    })
  }

  onItemSelect(items: any) {
    console.log(items);

  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
