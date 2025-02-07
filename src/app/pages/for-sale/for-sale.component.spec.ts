import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { GoatService } from '../../services/goat/goat.service';
import { ForSaleComponent } from './for-sale.component';

describe('ForSaleComponent', () => {
  let component: ForSaleComponent;
  let fixture: ComponentFixture<ForSaleComponent>;
  let goatServiceMock: any;
  let routeMock: any;

  beforeEach(async () => {
    goatServiceMock = {
      kidding: of([]),
      does: of([]),
      bucks: of([]),
      references: of([]),
      forSale: of({
        does: [],
        bucks: [],
        pets: []
      })
    };

    routeMock = {
      snapshot: {
        params: {
          goat: 'test-goat'
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ForSaleComponent],
      providers: [
        { provide: GoatService, useValue: goatServiceMock },
        { provide: ActivatedRoute, useValue: routeMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
