import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTermsComponent } from './sale-terms.component';

describe('SaleTermsComponent', () => {
  let component: SaleTermsComponent;
  let fixture: ComponentFixture<SaleTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleTermsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
