import { ElementRef } from '@angular/core';
import type { PlatformService } from '../../services/platform/platform.service';
import { TooltipDirective } from './tooltip.directive';

const bootstrap = { Tooltip: { getOrCreateInstance: jest.fn().mockReturnValue({ dispose: jest.fn(), setContent: jest.fn() }) } };

describe('TooltipDirective', () => {
  let directive: TooltipDirective;
  let el: ElementRef<HTMLElement>;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    (window as unknown as { bootstrap: object }).bootstrap = bootstrap;
    nativeElement = document.createElement('div');
    el = { nativeElement } as ElementRef<HTMLElement>;
    const platform = { isBrowser: true };
    directive = new TooltipDirective(el, platform as PlatformService);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set content attribute correctly', () => {
    directive.tooltip = 'Test Tooltip';
    expect(nativeElement.getAttribute('data-bs-title')).toBe('Test Tooltip');
  });

  it('should have correct host bindings', () => {
    expect(directive.toggle).toBe('tooltip');
    expect(directive.placement).toBe('auto');
  });

  describe('AfterViewInit', () => {
    beforeEach(() => {
      directive.ngAfterViewInit();
    });
    it('should create Bootstrap tooltip instance on ngAfterViewInit', () => {
      expect(bootstrap.Tooltip.getOrCreateInstance).toHaveBeenCalledWith(nativeElement, { placement: 'auto', html: false });
    });
    it('should update Bootstrap tooltip instance on content change', () => {
      directive.tooltip = 'New Tooltip';
      expect(directive['bsTooltip']!.setContent).toHaveBeenCalledWith({ '.tooltip-inner': 'New Tooltip' });
    });
    it('should dispose Bootstrap tooltip instance on ngOnDestroy', () => {
      directive.ngOnDestroy();
      expect(directive['bsTooltip']!.dispose).toHaveBeenCalled();
    });
    it('should hide tooltip on click', () => {
      directive['bsTooltip']!.hide = jest.fn();
      directive.onClick();
      expect(directive['bsTooltip']!.hide).toHaveBeenCalled();
    });
  });
});
