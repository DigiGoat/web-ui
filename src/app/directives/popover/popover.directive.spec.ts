import { ElementRef } from '@angular/core';
import { PopoverDirective } from './popover.directive';

const bootstrap = { Popover: { getOrCreateInstance: jest.fn().mockReturnValue({ dispose: jest.fn() }) } };

describe('PopoverDirective', () => {
  let directive: PopoverDirective;
  let el: ElementRef<HTMLElement>;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    (window as unknown as { bootstrap: object; }).bootstrap = bootstrap;
    nativeElement = document.createElement('div');
    el = { nativeElement } as ElementRef<HTMLElement>;
    directive = new PopoverDirective(el);
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

  it('should create Bootstrap popover instance on ngAfterViewInit', () => {
    const popoverSpy = jest.spyOn(bootstrap.Popover, 'getOrCreateInstance');
    directive.ngAfterViewInit();
    expect(popoverSpy).toHaveBeenCalledWith(nativeElement);
  });

  it('should dispose Bootstrap popover instance on ngOnDestroy', () => {
    directive.ngAfterViewInit();
    const disposeSpy = jest.spyOn(directive['bsPopover']!, 'dispose');
    directive.ngOnDestroy();
    expect(disposeSpy).toHaveBeenCalled();
  });
});
