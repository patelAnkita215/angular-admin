import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSupportQueriesComponent } from './customer-support-queries.component';

describe('CustomerSupportQueriesComponent', () => {
  let component: CustomerSupportQueriesComponent;
  let fixture: ComponentFixture<CustomerSupportQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSupportQueriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSupportQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
