import { Component, Input, ViewChild, type AfterViewInit, type ElementRef, type OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { Goat } from '../../../services/goat/goat.service';
import { PlatformService } from '../../../services/platform/platform.service';

@Component({
  selector: 'app-modal-goat',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnDestroy, AfterViewInit {
  prerender = this.platformService.isServer;
  @Input() goat?: Partial<Goat>;
  @Input({ required: true }) searchParam!: string;

  constructor(public router: Router, public route: ActivatedRoute, private platformService: PlatformService) { }
  ngOnDestroy() {
    this.modal?.hide();
    this.modal?.dispose();
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
  }

}
