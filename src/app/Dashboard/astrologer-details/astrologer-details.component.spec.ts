import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrologerDetailsComponent } from './astrologer-details.component';

describe('AstrologerDetailsComponent', () => {
  let component: AstrologerDetailsComponent;
  let fixture: ComponentFixture<AstrologerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstrologerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AstrologerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
