import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTimeModalComponent } from './delivery-time-modal.component';

describe('DeliveryTimeModalComponent', () => {
  let component: DeliveryTimeModalComponent;
  let fixture: ComponentFixture<DeliveryTimeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryTimeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryTimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
