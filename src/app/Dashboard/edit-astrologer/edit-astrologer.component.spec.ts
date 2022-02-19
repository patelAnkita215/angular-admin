import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAstrologerComponent } from './edit-astrologer.component';

describe('EditAstrologerComponent', () => {
  let component: EditAstrologerComponent;
  let fixture: ComponentFixture<EditAstrologerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAstrologerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAstrologerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
