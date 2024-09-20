import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongDatePipe } from '../../pipes/longDate/longDate.pipe';
import { BreedingComponent } from './breeding.component';

describe('KiddingComponent', () => {
  let component: BreedingComponent;
  let fixture: ComponentFixture<BreedingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreedingComponent, LongDatePipe]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BreedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('With a Kidding (v1.0.0)', () => {
    beforeEach(() => {
      component.breeding = {
        dam: 'TEST_DAM',
        sire: 'TEST_SIRE',
        description: 'TEST_DETAILS',
        exposed: '1-2-34',
        due: '5-6-78',
      };
      component.does = { find: jest.fn() } as any;
      component.bucks = { find: jest.fn() } as any;
      component.ngOnChanges();
      fixture.detectChanges();
    });
    it('should match the snapshot', () => {
      expect(fixture).toMatchSnapshot();
    });
    it('should try to find the dam', () => {
      expect(component.does!.find).toHaveBeenCalled();
    });
    it('should try to find the sire', () => {
      expect(component.bucks!.find).toHaveBeenCalled();
    });
    describe('With a previous Kidding', () => {
      beforeEach(() => {
        component.breeding = {
          ...component.breeding,
          kidded: '9-10-11',
        };
        component.ngOnChanges();
        fixture.detectChanges();
      });
      it('should match the snapshot', () => {
        expect(fixture).toMatchSnapshot();
      });
    });
  });
  describe('Without a Kidding', () => {
    beforeEach(() => {
      component.breeding = undefined;
      component.does = { find: jest.fn() } as any;
      component.bucks = { find: jest.fn() } as any;
      component.ngOnChanges();
      fixture.detectChanges();
    });
    it('should match the snapshot', () => {
      expect(fixture).toMatchSnapshot();
    });
    it('should NOT try to find the dam', () => {
      expect(component.does!.find).not.toHaveBeenCalled();
    });
    it('should NOT try to find the sire', () => {
      expect(component.bucks!.find).not.toHaveBeenCalled();
    });
  });
});
