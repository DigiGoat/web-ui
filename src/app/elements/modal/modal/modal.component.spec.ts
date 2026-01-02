import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, type Router } from '@angular/router';
import type { PlatformService } from '../../../services/platform/platform.service';
import { ModalComponent } from './modal.component';

jest.mock('@angular/router');
const bootstrap = { Modal: { getOrCreateInstance: jest.fn().mockReturnValue({ dispose: jest.fn(), show: jest.fn(), hide: jest.fn() }) } };
describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let html: HTMLElement;

  beforeEach(async () => {
    (window as unknown as { bootstrap: object }).bootstrap = bootstrap;
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [ActivatedRoute]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    html = fixture.nativeElement;
    component['router'] = { navigate: jest.fn(), url: '' } as unknown as Router;
    component.searchParam = 'TEST_PARAM';
  });
  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  describe('In a browser', () => {
    beforeEach(() => {
      component['platformService'] = { isServer: false, isBrowser: true, isBot: false } as PlatformService;
      fixture.detectChanges();
    });
    it('should initialize the Modal', () => {
      expect(bootstrap.Modal.getOrCreateInstance).toHaveBeenCalledTimes(1);
    });
    it('should open the modal', () => {
      expect(component['modal']?.show).toHaveBeenCalledTimes(1);
    });
    it('should navigate backwards when the modal closes', () => {
      component.modalElement.nativeElement.dispatchEvent(new Event('hidden.bs.modal'));
      expect(component['router'].navigate).toHaveBeenCalledTimes(1);
      expect(component['router'].navigate).toHaveBeenCalledWith(['../'], { relativeTo: component['route'] });
    });
    it('should close the modal when destroyed', () => {
      fixture.destroy();
      expect(component['modal']?.hide).toHaveBeenCalledTimes(1);
      expect(component['modal']?.dispose).toHaveBeenCalledTimes(1);
    });
  });
  describe('On the Server', () => {
    beforeEach(() => {
      component['platformService'] = { isServer: true, isBrowser: false, isBot: false } as PlatformService;
      fixture.detectChanges();
    });
    it('should not initialize the Modal', () => {
      expect(bootstrap.Modal.getOrCreateInstance).not.toHaveBeenCalled();
    });
  });
  describe('With a Goat', () => {
    beforeEach(() => {
      component.goat = { name: 'Billy' };
      fixture.detectChanges();
    });
    it('should set the header to the searchParam', () => {
      const element = html.querySelector('[test-id=searchParam]');
      expect(element).toBeTruthy();
      expect(element?.innerHTML).toBe('TEST_PARAM');
    });
    it('should display the goat card', () => {
      const element = html.querySelector('[test-id=goat-card]');
      expect(element).toBeTruthy();
    });
    it('should not display the not-found card', () => {
      const element = html.querySelector('[test-id=not-found]');
      expect(element).toBeFalsy();
    });
    it('should match the snapshot', () => {
      expect(fixture).toMatchSnapshot();
    });
  });
  describe('Without a Goat', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    it('should set the header to the searchParam', () => {
      const element = html.querySelector('[test-id=searchParam]');
      expect(element).toBeTruthy();
      expect(element?.innerHTML).toBe('TEST_PARAM');
    });
    it('should display not the goat card', () => {
      const element = html.querySelector('[test-id=goat-card]');
      expect(element).toBeFalsy();
    });
    it('should display the not-found card', () => {
      const element = html.querySelector('[test-id=not-found]');
      expect(element).toBeTruthy();
    });
    it('should match the snapshot', () => {
      expect(fixture).toMatchSnapshot();
    });
  });
});
