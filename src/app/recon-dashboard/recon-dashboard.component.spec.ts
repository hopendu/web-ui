import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconDashboardComponent } from './recon-dashboard.component';

describe('ReconDashboardComponent', () => {
  let component: ReconDashboardComponent;
  let fixture: ComponentFixture<ReconDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReconDashboardComponent]
    });
    fixture = TestBed.createComponent(ReconDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
