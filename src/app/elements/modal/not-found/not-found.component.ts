import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-modal-not-found',
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss',
    standalone: false
})
export class NotFoundComponent {
  @Input({ required: true }) searchParam!: string;
}
