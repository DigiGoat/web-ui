import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoatsComponent } from './goats.component';


const goat = {
  nickname: 'Your Goats Farm Name',
  name: 'YOUR GOATS ADGA NAME',
  description: 'A quick description about your goat',
  normalizeId: 'PD12345',
  dateOfBirth: new Date(Date.now() - (1000 * 3600 * 24)).toString()
};
describe('GoatsComponent', () => {
  let component: GoatsComponent;
  let fixture: ComponentFixture<GoatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoatsComponent],
      //schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(GoatsComponent);
    component = fixture.componentInstance;
    component.name = 'TEST GOATS';
  });
  describe('Without a Goat', () => {
    let html: HTMLElement;
    beforeEach(() => {
      component.getter = of([]);
      fixture.detectChanges();
      html = fixture.nativeElement;
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should set noGoats to true', () => {
      expect(component.noGoats).toBe(true);
    });
    it('should not display goats', () => {
      const element = html.querySelector('[test-id=goats]');
      expect(element).toBeFalsy();
    });
    it('should not display an error', () => {
      const element = html.querySelector('[test-id=error]');
      expect(element).toBeFalsy();
    });
    it('should display no-goats', () => {
      const element = html.querySelector('[test-id=no-goats]');
      expect(element).toBeTruthy();
    });
    it('should display no-goats-title', () => {
      const element = html.querySelector('[test-id=no-goats-title]');
      expect(element?.innerHTML).toBe('No TEST GOATS Found');
    });
    it('should display no-goats-description', () => {
      const element = html.querySelector('[test-id=no-goats-description]');
      expect(element?.innerHTML).toBe('Please Try Again Later.');
    });
    it('should match the snapshot', () => {
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });
  });
  describe('With a Error', () => {
    let html: HTMLElement;
    beforeEach(() => {
      component.getter = throwError(() => { return { status: -1, statusText: 'TEST_ERROR' }; });
      fixture.detectChanges();
      html = fixture.nativeElement;
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should set err', () => {
      expect(component.err).toEqual({ status: -1, statusText: 'TEST_ERROR' });
    });
    it('should not display goats', () => {
      const element = html.querySelector('[test-id=goats]');
      expect(element).toBeFalsy();
    });
    it('should not display no-goats', () => {
      const element = html.querySelector('[test-id=no-goats]');
      expect(element).toBeFalsy();
    });
    it('should display error', () => {
      const element = html.querySelector('[test-id=error]');
      expect(element).toBeTruthy();
    });
    it('should display no-goats-title', () => {
      const element = html.querySelector('[test-id=error-title]');
      expect(element?.innerHTML).toBe('Failed To Load TEST GOATS With Error: -1 - TEST_ERROR');
    });
    it('should display no-goats-description', () => {
      const element = html.querySelector('[test-id=error-description]');
      expect(element?.innerHTML).toBe('Please Check Your Connection And Try Again Later.');
    });
    it('should match the snapshot', () => {
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });
  });

  describe('With a Goat (v1.0.0)', () => {
    let html: HTMLElement;
    beforeEach(() => {
      component.getter = of([goat]);
      fixture.detectChanges();
      html = fixture.nativeElement;
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should not display no-goats', () => {
      const element = html.querySelector('[test-id=no-goats]');
      expect(element).toBeFalsy();
    });
    it('should not display an error', () => {
      const element = html.querySelector('[test-id=error]');
      expect(element).toBeFalsy();
    });
    it('should display goats', () => {
      const element = html.querySelector('[test-id=goats]');
      expect(element).toBeTruthy();
    });
    it('should display a title', () => {
      const element = html.querySelector('[test-id=title]');
      expect(element?.innerHTML).toBe('TEST GOATS');
    });
    it('should display a description', () => {
      const element = html.querySelector('[test-id=description]');
      expect(element?.innerHTML).toBe('Click on a TEST GOAT Below For More Info');
    });
    it('should display a goat', () => {
      const elements = html.querySelectorAll('[test-id=goat-cards]');
      expect(elements).toBeTruthy();
      expect(elements).toHaveLength(1);
    });
    it('should not display placeholders', () => {
      const elements = html.querySelector('[test-id=goat-placeholders]');
      expect(elements).toBeFalsy();
    });
    it('should match the snapshot', () => {
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });
  });
  describe('While loading', () => {
    let html: HTMLElement;
    beforeEach(() => {
      component.getter = of([goat]);
      fixture.detectChanges();
      component.goats = [];
      fixture.detectChanges();
      html = fixture.nativeElement;
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should not display no-goats', () => {
      const element = html.querySelector('[test-id=no-goats]');
      expect(element).toBeFalsy();
    });
    it('should not display an error', () => {
      const element = html.querySelector('[test-id=error]');
      expect(element).toBeFalsy();
    });
    it('should display goats', () => {
      const element = html.querySelector('[test-id=goats]');
      expect(element).toBeTruthy();
    });
    it('should display a title', () => {
      const element = html.querySelector('[test-id=title]');
      expect(element?.innerHTML).toBe('TEST GOATS');
    });
    it('should display a description', () => {
      const element = html.querySelector('[test-id=description]');
      expect(element?.innerHTML).toBe('Click on a TEST GOAT Below For More Info');
    });
    it('should display placeholders', () => {
      const elements = html.querySelectorAll('[test-id=placeholder-cards]');
      expect(elements).toBeTruthy();
      expect(elements).toHaveLength(8);
    });
    it('should not display goats', () => {
      const elements = html.querySelector('[test-id=goat-cards]');
      expect(elements).toBeFalsy();
    });
    it('should match the snapshot', () => {
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });
  });
});
