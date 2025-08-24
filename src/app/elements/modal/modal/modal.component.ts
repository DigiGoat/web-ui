import { booleanAttribute, Component, ElementRef, Input, ViewChild, type AfterViewInit, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { Goat } from '../../../services/goat/goat.service';
import { PlatformService } from '../../../services/platform/platform.service';

@Component({
  selector: 'app-modal-goat',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  standalone: false
})
export class ModalComponent implements OnDestroy, AfterViewInit, OnInit {
  prerender = false;
  @Input() goat?: Goat;
  @Input({ required: true }) searchParam!: string;
  @Input({ transform: booleanAttribute, alias: 'for-sale' }) forSale?: boolean = false;

  get prettySearchParam() {
    return this.searchParam.replace(/-/g, ' ');
  }

  constructor(public router: Router, public route: ActivatedRoute, private platformService: PlatformService, private element: ElementRef<HTMLDivElement>) { }
  document = this.element.nativeElement.ownerDocument;
  ngOnInit() {
    this.prerender = this.platformService.isServer;
    if (this.goat) {
      // Generate identifier as in GoatCardComponent
      const identifier = (this.goat.nickname || this.goat.name || this.goat.normalizeId)?.replace(/ /g, '-');
      let canonicalUrl: string;
      if (identifier && this.searchParam !== identifier) {
        const segments = this.router.url.split('/');
        segments[segments.length - 1] = identifier;
        canonicalUrl = segments.join('/');
      } else {
        canonicalUrl = this.router.url;
      }
      // Remove any existing canonical link
      const oldCanonical = this.document.querySelector('link[rel="canonical"]');
      if (oldCanonical) oldCanonical.remove();

      // Add new canonical link
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', canonicalUrl);
      this.document.head.appendChild(link);
    }
  }
  ngOnDestroy() {
    this.close();
    // Remove any existing canonical link
    const oldCanonical = this.document.querySelector('link[rel="canonical"]');
    if (oldCanonical) oldCanonical.remove();
  }

  @ViewChild('modal') modalElement!: ElementRef<HTMLDivElement>;
  private modal?: bootstrap.Modal;
  ngAfterViewInit() {
    if (!this.prerender) {
      this.modal = bootstrap.Modal.getOrCreateInstance(this.modalElement.nativeElement);
      this.open();
      this.modalElement.nativeElement.addEventListener('hidden.bs.modal', () => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    }
  }

  open() {
    this.modal?.show();
  }
  close() {
    this.modal?.hide();
    this.modal?.dispose();
  }
}
