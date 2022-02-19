import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAstrologerComponent } from './add-astrologer.component';

describe('AddAstrologerComponent', () => {
  let component: AddAstrologerComponent;
  let fixture: ComponentFixture<AddAstrologerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAstrologerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAstrologerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
