import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { SaleTermsComponent } from './sale-terms.component';

describe('SaleTermsComponent', () => {
  let component: SaleTermsComponent;
  let fixture: ComponentFixture<SaleTermsComponent>;
  let routeMock: any;

  beforeEach(async () => {
    routeMock = {
      snapshot: {
        fragment: 'sale-terms'
      }
    };

    await TestBed.configureTestingModule({
      declarations: [SaleTermsComponent],
      providers: [{ provide: ActivatedRoute, useValue: routeMock }
      ]
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
