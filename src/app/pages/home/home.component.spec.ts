import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { ConfigService } from '../../services/config/config.service';
import { ConfigServiceMock, EmptyConfigServiceMock } from '../../services/config/config.service.mock';
import { GoatService } from '../../services/goat/goat.service';
import { HomeComponent } from './home.component';


jest.mock('../../services/config/config.service');
jest.mock('../../services/goat/goat.service');
const configService = jest.mocked(ConfigService);
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let html: HTMLElement;

  beforeEach(async () => {
    configService.mockClear();
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [ConfigService, GoatService],
    })
      .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    TestBed.inject(ConfigService);
    component = fixture.componentInstance;
    component['goatService'] = { does: of([]), bucks: of([]) } as unknown as GoatService;
    html = fixture.nativeElement;
  });
  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  describe('With a config', () => {
    beforeEach(() => {
      configService.mockImplementation(() => {
        return ConfigServiceMock;
      });
      fixture.detectChanges();
    });
    it('should call ConfigService once', () => {
      expect(configService).toHaveBeenCalledTimes(1);
    });
    it('should have a title', () => {
      const element = html.querySelector('[test-id=title]');
      expect(element).toBeTruthy();
      expect(element?.innerHTML).toBe(ConfigServiceMock.homeTitle);
    });
    it('should have an owner', () => {
      const element = html.querySelector('[test-id=owner]');
      expect(element).toBeTruthy();
      expect(element?.innerHTML).toBe(ConfigServiceMock.owner);
    });
    it('should have an email', () => {
      const element = html.querySelector('[test-id=email]');
      expect(element).toBeTruthy();
      expect(element?.innerHTML).toBe(`<a href="mailto:${ConfigServiceMock.email}">${ConfigServiceMock.email}</a>`);
    });
    it('should have a description', () => {
      const element = html.querySelector('[test-id=description]');
      expect(element).toBeTruthy();
      expect(element?.innerHTML).toBe(ConfigServiceMock.homeDescription);
    });
    it('should match the snapshot', () => {
      expect(fixture).toMatchSnapshot();
    });
  });
  describe('Without a config', () => {
    beforeEach(() => {
      configService.mockImplementation(() => {
        return EmptyConfigServiceMock;
      });
      fixture.detectChanges();
    });
    it('should call ConfigService once', () => {
      expect(configService).toHaveBeenCalledTimes(1);
    });
    it('should not have a title', () => {
      const element = html.querySelector('[test-id=title]');
      expect(element?.innerHTML).toBeFalsy();
    });
    it('should not have an owner', () => {
      const element = html.querySelector('[test-id=owner]');
      expect(element?.innerHTML).toBeFalsy();
    });
    it('should not have an email', () => {
      const element = html.querySelector('[test-id=email]');
      expect(element?.innerHTML).toBe('<a href="mailto:"></a>');
    });
    it('should not have a description', () => {
      const element = html.querySelector('[test-id=description]');
      expect(element).toBeTruthy();
      expect(element?.innerHTML).toBe('');
    });
    it('should match the snapshot', () => {
      expect(fixture).toMatchSnapshot();
    });
  });
});
