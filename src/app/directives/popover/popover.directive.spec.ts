import { ElementRef } from '@angular/core';
import type { PlatformService } from '../../services/platform/platform.service';
import { PopoverDirective } from './popover.directive';

const bootstrap = { Popover: { getOrCreateInstance: jest.fn().mockReturnValue({ dispose: jest.fn(), setContent: jest.fn() }) } };

describe('PopoverDirective', () => {
  let directive: PopoverDirective;
  let el: ElementRef<HTMLElement>;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    (window as unknown as { bootstrap: object }).bootstrap = bootstrap;
    nativeElement = document.createElement('div');
    el = { nativeElement } as ElementRef<HTMLElement>;
    const platform = { isBrowser: true };
    directive = new PopoverDirective(el, platform as PlatformService);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set content attribute correctly', () => {
    directive.content = 'Test Content';
    expect(nativeElement.getAttribute('data-bs-content')).toBe('Test Content');
  });

  it('should set title attribute correctly', () => {
    directive.title = 'Test Title';
    expect(nativeElement.getAttribute('data-bs-title')).toBe('Test Title');
  });

  it('should have correct host bindings', () => {
    expect(directive.toggle).toBe('popover');
    expect(directive.trigger).toBe('hover focus');
    expect(directive.html).toBe(true);
    expect(directive.customClass).toBe('bs-popover');
    expect(directive.placement).toBe('auto');
    expect(directive.boundary).toBe('{ "show": 200, "hide": 250 }');
  });

  describe('AfterViewInit', () => {
    beforeEach(() => {
      directive.ngAfterViewInit();
    });
    it('should create Bootstrap popover instance on ngAfterViewInit', () => {
      expect(bootstrap.Popover.getOrCreateInstance).toHaveBeenCalledWith(nativeElement);
    });
    it('should update Bootstrap popover instance on content change', () => {
      directive.content = 'New Content';
      expect(directive['bsPopover']!.setContent).toHaveBeenCalledWith({ '.popover-body': 'New Content' });
    });
    it('should update Bootstrap popover instance on title change', () => {
      directive.title = 'New Title';
      expect(directive['bsPopover']!.setContent).toHaveBeenCalledWith({ '.popover-header': 'New Title' });
    });
    it('should dispose Bootstrap popover instance on ngOnDestroy', () => {
      directive.ngOnDestroy();
      expect(directive['bsPopover']!.dispose).toHaveBeenCalled();
    });
  });
});
