import type { ElementRef } from '@angular/core';
import type { ImageService } from '../../services/image/image.service';
import { ImgDirective } from './img.directive';

const body = document.createElement('body');
body.innerHTML = `
  <div>
    <img>
  </div>
  <div class="placeholder-glow">
    <img>
  </div>
    <div class="placeholder-wave">
    <img>
  </div>
    <div>
    <img class="placeholder">
  </div>
`;

describe('ImgDirective', () => {
  let directive: ImgDirective;
  let el: ElementRef<HTMLImageElement>;
  let element: HTMLImageElement;
  let placeholderSpy: jest.SpyInstance;
  let notFoundSpy: jest.SpyInstance;
  let consoleSpy: jest.SpyInstance;
  const imageService = {
    NotFound: {
      file: 'TEST_FILE',
      alt: 'TEST_ALT',
    }
  } as ImageService;

  describe.each(Array.from(body.querySelectorAll('img')))('Image %#', (image) => {
    beforeEach(() => {
      el = {
        nativeElement: image
      } as ElementRef<HTMLImageElement>;

      directive = new ImgDirective(el, imageService);
      placeholderSpy = jest.spyOn(directive, 'placeholder');
      notFoundSpy = jest.spyOn(directive, 'notFound');
      consoleSpy = jest.spyOn(console, 'warn');
      directive.ngOnInit();
      element = el.nativeElement;
    });

    it('should create an instance', () => {
      expect(directive).toBeTruthy();
    });

    it('should add placeholder class to image and parent class ', () => {
      expect(placeholderSpy).toHaveBeenCalledTimes(1);
      expect(placeholderSpy).toHaveBeenCalledWith(true);

      const classList = element.classList;
      const parentClassList = element.parentElement!.classList;

      expect(classList).toContain('placeholder');
      expect(classList).toContain('border');
      if (parentClassList.contains('placeholder-glow')) {
        expect(parentClassList).not.toContain('placeholder-wave');
      } else {
        expect(parentClassList).toContain('placeholder-wave');
      }
    });

    it('should remove placeholder class and parent class on load event', () => {
      placeholderSpy.mockClear();
      element.dispatchEvent(new Event('load'));

      expect(placeholderSpy).toHaveBeenCalledTimes(1);
      expect(placeholderSpy).toHaveBeenCalledWith(false);


      const classList = element.classList;
      const parentClassList = element.parentElement!.classList;

      expect(classList).not.toContain('placeholder');
      expect(classList).not.toContain('border');
      expect(parentClassList).not.toContain('placeholder-wave');
      expect(parentClassList).not.toContain('placeholder-glow');
    });

    it('should log warning and call notFound method on error event', () => {
      placeholderSpy.mockClear();
      element.dispatchEvent(new Event('error'));

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to load image from',
        element.src,
        'with alt',
        element.alt
      );
      expect(placeholderSpy).toHaveBeenCalledTimes(1);
      expect(placeholderSpy).toHaveBeenCalledWith(false);

      expect(notFoundSpy).toHaveBeenCalledTimes(1);
      expect(element.style.backgroundImage).toBe(`url(${imageService.NotFound.file})`);
      expect(element.classList).toContain('not-found');
    });
  });
});
