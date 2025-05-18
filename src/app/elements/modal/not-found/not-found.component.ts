import { Component, Input, type OnDestroy, type OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  standalone: false
})
export class NotFoundComponent implements OnInit, OnDestroy {
  @Input({ required: true }) searchParam!: string;
  constructor(private meta: Meta) { }
  ngOnInit(): void {
    this.meta.addTag({ name: 'robots', content: 'noindex' });
  }
  ngOnDestroy(): void {
    this.meta.removeTag('name="robots"');
  }
}
