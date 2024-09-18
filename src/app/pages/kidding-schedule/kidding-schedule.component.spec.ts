import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { GoatService } from '../../services/goat/goat.service';
import { KiddingScheduleComponent } from './kidding-schedule.component';


describe('KiddingScheduleComponent', () => {
  let component: KiddingScheduleComponent;
  let fixture: ComponentFixture<KiddingScheduleComponent>;
  let goatServiceMock: any;
  let routeMock: any;

  beforeEach(async () => {
    goatServiceMock = {
      kidding: of([]),
      does: of([]),
      bucks: of([])
    };

    routeMock = {
      snapshot: {
        params: {
          goat: 'test-goat'
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [KiddingScheduleComponent],
      providers: [
        { provide: GoatService, useValue: goatServiceMock },
        { provide: ActivatedRoute, useValue: routeMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(KiddingScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a setDescription method', () => {
    expect(component.setDescription).toBeDefined();
  });

  it('should initialize with correct searchParam', () => {
    expect(component.searchParam).toBe('test goat');
  });

  it('should set noSchedule to true if no kidding data', () => {
    goatServiceMock.kidding = of([]);
    component.ngOnInit();
    expect(component.noSchedule).toBe(true);
  });

  it('should handle error in kidding subscription', () => {
    const errorResponse = new HttpErrorResponse({ error: 'Error' });
    goatServiceMock.kidding = throwError(errorResponse);
    component.ngOnInit();
    expect(component.err).toBe(errorResponse);
  });

  it('should set does correctly', () => {
    const doesData = [{ nickname: 'doe1', name: 'Doe 1', normalizeId: 'doe1' }];
    goatServiceMock.does = of(doesData);
    component.ngOnInit();
    expect(component.does).toEqual(doesData);
  });

  it('should set bucks correctly', () => {
    const bucksData = [{ nickname: 'buck1', name: 'Buck 1', normalizeId: 'buck1' }];
    goatServiceMock.bucks = of(bucksData);
    component.ngOnInit();
    expect(component.bucks).toEqual(bucksData);
  });

  it('should determine active goat correctly', () => {
    const goats = [
      { nickname: 'test-goat', name: 'Test Goat', normalizeId: 'test-goat' },
      { nickname: 'another-goat', name: 'Another Goat', normalizeId: 'another-goat' }
    ];
    component.searchParam = 'test-goat';
    component.determineActiveGoat(goats);
    expect(component.activeGoat).toEqual(goats[0]);
  });

  it('should set activeIndex correctly', () => {
    const schedule = [{ dam: 'test-goat', sire: 'sire1' }];
    component.schedule = schedule;
    component.activeGoat = { nickname: 'test-goat', name: 'Test Goat', normalizeId: 'test-goat' };
    component.determineActiveGoat([]);
    expect(component.activeIndex).toBe(0);
  });

});
