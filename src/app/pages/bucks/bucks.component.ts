import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GoatService } from '../../services/goat/goat.service';

@Component({
    selector: 'app-bucks',
    templateUrl: './bucks.component.html',
    styleUrl: './bucks.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class BucksComponent {
  goatService = inject(GoatService);

  name = 'Bucks';
  getter = this.goatService.bucks;
}
