import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageService } from '../../services/image/image.service';
import { GoatCardComponent } from './goat-card.component';
import { AgePipe } from '../../pipes/age.pipe';


jest.mock('../../services/image/image.service');
const imageService = jest.mocked(ImageService);
describe('GoatCardComponent', () => {
  let component: GoatCardComponent;
  let fixture: ComponentFixture<GoatCardComponent>;

  beforeEach(async () => {
    imageService.mockClear();
    await TestBed.configureTestingModule({
      declarations: [GoatCardComponent, AgePipe],
      providers: [ImageService],
    })
      .compileComponents();
    fixture = TestBed.createComponent(GoatCardComponent);
    component = fixture.componentInstance;
    TestBed.inject(ImageService);

    imageService.mockImplementation(() => {
      return {
        getImage: () => { return { file: 'TEST_IMAGE_FILE' }; },
        NotFound: { file: 'TEST_NOT_FOUND' }
      } as any;

    });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should call ImageService once', () => {
    fixture.detectChanges();
    expect(imageService).toHaveBeenCalledTimes(1);
  });
  describe('With a Goat (v1.0.0)', () => {
    let html: HTMLElement;
    beforeEach(() => {
      component['goat'] = {
        nickname: 'Your Goats Farm Name',
        name: 'YOUR GOATS ADGA NAME',
        description: 'A quick description about your goat',
        dateOfBirth: new Date(Date.now() - (1000 * 3600 * 24)).toString(),
        normalizeId: 'PD12345',
      };
      fixture.detectChanges();
      html = fixture.nativeElement;
    });
    it('should exist', () => {
      const element = html.querySelector('[test-id="goat"]') as HTMLDivElement;
      expect(element).toBeTruthy();
    });
    it('should NOT display the placeholder div', () => {
      const element = html.querySelector('[test-id="placeholder"]') as HTMLDivElement;
      expect(element).toBeFalsy();
    });
    it('should have an image', () => {
      const element = html.querySelector('[test-id="goat-image"]') as HTMLImageElement & { ngSrc: string; };
      expect(element).toBeTruthy();
      expect(element.classList).toContain('placeholder');
      expect(element.ngSrc).toBe('TEST_IMAGE_FILE');
      expect(element.width).toBe(400);
      expect(element.height).toBe(250);
    });
    it('should reveal the image once loaded', () => {
      const element = html.querySelector('[test-id="goat-image"]') as HTMLImageElement;
      expect(element).toBeTruthy();
      expect(element.classList).toContain('placeholder');
      expect(element.parentElement!.classList).toContain('placeholder-wave');
      element.dispatchEvent(new Event('load'));
      expect(element.classList).not.toContain('placeholder');
      expect(element.parentElement!.classList).not.toContain('placeholder-wave');
    });
    it('should set image src to NotFound if image fails to load ONCE', async () => {
      const element = html.querySelector('[test-id="goat-image"]') as HTMLImageElement;
      expect(element).toBeTruthy();
      expect(element.classList).toContain('placeholder');
      expect(element.parentElement!.classList).toContain('placeholder-wave');
      expect(component.imageRef).toBeTruthy();
      element.dispatchEvent(new Event('error'));
      expect(element.src).toBe('http://localhost/TEST_NOT_FOUND');
      element.dispatchEvent(new Event('load'));
      expect(element.classList).not.toContain('placeholder');
      expect(element.parentElement!.classList).not.toContain('placeholder-wave');
    });
    it('should log image loading failures', () => {
      const element = html.querySelector('[test-id="goat-image"]') as HTMLImageElement;
      expect(element).toBeTruthy();
      const consoleSpy = jest.spyOn(console, 'warn');
      element.dispatchEvent(new Event('error'));
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith('[Your Goats Farm Name]', 'Failed to load image');
    });
    it('should have a link', () => {
      const element = html.querySelector('[test-id="goat-link"]') as HTMLAnchorElement & { routerLink: string; };
      expect(element).toBeTruthy();
      expect(element.routerLink).toBe('Your Goats Farm Name');
    });
    it('should have a name', () => {
      const element = html.querySelector('[test-id="goat-name"]') as HTMLHeadingElement;
      expect(element).toBeTruthy();
      expect(element.innerHTML).toBe('YOUR GOATS ADGA NAME');
    });
    it('should have an age', () => {
      const element = html.querySelector('[test-id="goat-age"]') as HTMLHeadingElement;
      expect(element).toBeTruthy();
      expect(element.innerHTML).toBe('1 day old');
    });
    it('should have a nickname', () => {
      const element = html.querySelector('[test-id="goat-nickname"]') as HTMLHeadingElement;
      expect(element).toBeTruthy();
      expect(element.innerHTML).toBe('"Your Goats Farm Name"');
    });
    it('should have a description', () => {
      const element = html.querySelector('[test-id="goat-description"]') as HTMLDivElement;
      expect(element).toBeTruthy();
      expect(element.innerHTML).toBe('A quick description about your goat');
    });
    it('should match the snapshot', () => {
      expect(fixture).toMatchSnapshot();
    });
  });
  describe('Without a Goat', () => {
    let html: HTMLElement;
    beforeEach(() => {
      fixture.detectChanges();
      html = fixture.nativeElement;
    });
    it('should exist', () => {
      const element = html.querySelector('[test-id="placeholder"]') as HTMLDivElement;
      expect(element).toBeTruthy();
    });
    it('should NOT display the goat div', () => {
      const element = html.querySelector('[test-id="goat"]') as HTMLDivElement;
      expect(element).toBeFalsy();
    });
    it('should have a placeholder image', () => {
      const element = html.querySelector('[test-id="placeholder-image"]') as HTMLImageElement;
      expect(element).toBeTruthy();
      expect(element.classList).toContain('placeholder');
      expect(element.parentElement!.classList).toContain('placeholder-glow');
      expect(element.width).toBe(400);
      expect(element.height).toBe(200);
    });
    it('should have a placeholder name', () => {
      const element = html.querySelector('[test-id="placeholder-name"]') as HTMLHeadingElement;
      expect(element).toBeTruthy();
      expect(element.classList).toContain('placeholder');
      expect(element.parentElement!.classList).toContain('placeholder-wave');
      expect(element.textContent).toBe('SOME ANIMALS NAME');
    });
    it('should have a placeholder nickname', () => {
      const element = html.querySelector('[test-id="placeholder-nickname"]') as HTMLHeadingElement;
      expect(element).toBeTruthy();
      expect(element.classList).toContain('placeholder');
      expect(element.parentElement!.classList).toContain('placeholder-wave');
      expect(element.textContent).toBe('"Nickname"');
    });
    it('should match the snapshot', () => {
      expect(fixture).toMatchSnapshot();
    });
  });
});
