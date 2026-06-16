import { Component, Input, type OnDestroy, type OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class NotFoundComponent implements OnInit, OnDestroy {
  private meta = inject(Meta);

  @Input({ required: true }) searchParam!: string;
  ngOnInit(): void {
    this.meta.addTag({ name: 'robots', content: 'noindex' });
  }
  ngOnDestroy(): void {
    this.meta.removeTag('name="robots"');
  }
}
