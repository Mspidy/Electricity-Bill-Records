import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricBillSummaryComponent } from './electric-bill-summary.component';

describe('ElectricBillSummaryComponent', () => {
  let component: ElectricBillSummaryComponent;
  let fixture: ComponentFixture<ElectricBillSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricBillSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricBillSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
