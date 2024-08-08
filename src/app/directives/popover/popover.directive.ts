import { Directive, ElementRef, HostBinding, Input, type AfterViewInit, type OnDestroy } from '@angular/core';
import { Popover } from 'bootstrap';
@Directive({
  selector: '[bs-popover]'
})
export class PopoverDirective implements AfterViewInit, OnDestroy {
  private bsPopover?: Popover;
  @Input({ required: true, alias: 'popover-content' }) set content(value: string) {
    if (this.bsPopover) {
      this.bsPopover.setContent({ '.popover-body': value });
    } else {
      this.el.nativeElement.setAttribute('data-bs-content', value);
    }
  }
  @Input({ required: true, alias: 'popover-title' }) set title(value: string) {
    if (this.bsPopover) {
      this.bsPopover.setContent({ '.popover-header': value });
    } else {
      this.el.nativeElement.setAttribute('data-bs-title', value);
    }
  }
  @HostBinding('attr.data-bs-toggle') toggle = 'popover';
  @HostBinding('attr.data-bs-trigger') trigger = 'hover focus';
  @HostBinding('attr.data-bs-html') html = true;
  @HostBinding('attr.data-bs-custom-class') customClass = 'bs-popover';
  @HostBinding('attr.data-bs-placement') placement = 'auto';
  @HostBinding('attr.data-bs-delay') boundary = '{ "show": 200, "hide": 250 }';

  constructor(private el: ElementRef) { }
  ngAfterViewInit(): void {
    this.bsPopover = bootstrap.Popover.getOrCreateInstance(this.el.nativeElement);
  }
  ngOnDestroy(): void {
    this.bsPopover?.dispose();
  }

}
