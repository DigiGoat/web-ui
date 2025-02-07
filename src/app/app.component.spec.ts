import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ConfigService } from './services/config/config.service';
import { ConfigServiceMock, EmptyConfigServiceMock } from './services/config/config.service.mock';

jest.mock('./services/config/config.service');
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let html: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [ConfigService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    html = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should split strings in half', () => {
    expect(component.splitString('Test String')).toBe('Test<br>String');
    expect(component.splitString('Really Long Test String')).toBe('Really Long<br>Test String');
    expect(component.splitString('Odd Test String')).toBe('Odd<br>Test String');
    expect(component.splitString('Test   String')).toBe('Test <br> String');
    expect(component.splitString('Test')).toBe('Test');
  });
  describe('With a Config (v1.0.0)', () => {
    beforeEach(() => {
      component.config = ConfigServiceMock;
      fixture.detectChanges();
    });
    it('should have a menubar title', () => {
      const element = html.querySelector('[test-id=menubar]');
      expect(element).toBeTruthy();
      expect(element?.innerHTML).toBe('TEST_TITLE');
    });
    it('should have an owner', () => {
      const element = html.querySelector('[test-id=owner]');
      expect(element).toBeTruthy();
      expect(element?.innerHTML).toBe('TEST_OWNER');
    });
    it('should have an email', () => {
      const element = html.querySelector<HTMLAnchorElement>('[test-id=email]');
      expect(element).toBeTruthy();
      expect(element?.innerHTML).toBe('TEST_EMAIL');
      expect(element?.href).toBe('mailto:TEST_EMAIL');
    });
    it('should match the snapshot', () => {
      expect(fixture).toMatchSnapshot();
    });
  });
  describe('Without a Config', () => {
    beforeEach(() => {
      component.config = EmptyConfigServiceMock;
      fixture.detectChanges();
    });
    it('should not have a menubar title', () => {
      const element = html.querySelector('[test-id=menubar]');
      expect(element?.innerHTML).toBeFalsy();
    });
    it('should have an owner', () => {
      const element = html.querySelector('[test-id=owner]');
      expect(element?.innerHTML).toBeFalsy();
    });
    it('should have an email', () => {
      const element = html.querySelector<HTMLAnchorElement>('[test-id=email]');
      expect(element?.innerHTML).toBeFalsy();
      expect(element?.href).toBe('mailto:');
    });
    it('should match the snapshot', () => {
      expect(fixture).toMatchSnapshot();
    });
  });
});
