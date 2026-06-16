import { Component, type OnDestroy, type OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import type { Observable } from 'rxjs';
import type { Page } from '../../app-routing.module';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NotFoundComponent implements OnInit, Page, OnDestroy {
  private meta = inject(Meta);

  ngOnInit(): void {
    this.setDescription();
  }
  setDescription(): void | Observable<void> {
    this.meta.addTag({ name: 'robots', content: 'noindex' });
  }
  ngOnDestroy(): void {
    this.meta.removeTag('name="robots"');
  }
}
