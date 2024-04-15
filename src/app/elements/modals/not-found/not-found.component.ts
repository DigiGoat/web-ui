import { Component, Input, ViewChild, type AfterViewInit, type ElementRef, type OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found-modal',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class GoatModalComponent implements OnDestroy, AfterViewInit {
  @Input({ required: true }) searchParam!: string;

  constructor(public router: Router, public route: ActivatedRoute) { }

  ngOnDestroy() {
    this.modal.hide();
  }

  @ViewChild('modal') modalElement!: ElementRef<HTMLDivElement>;
  private modal!: bootstrap.Modal;
  ngAfterViewInit() {
    this.modal = bootstrap.Modal.getOrCreateInstance(this.modalElement.nativeElement);
    this.open();
    this.modalElement.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  open() {
    this.modal.show();
  }
  close() {
    this.modal.hide();
  }
}
