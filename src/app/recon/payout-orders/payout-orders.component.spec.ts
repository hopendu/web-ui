import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutOrdersComponent } from './payout-orders.component';

describe('PayoutOrdersComponent', () => {
  let component: PayoutOrdersComponent;
  let fixture: ComponentFixture<PayoutOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
