import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { GoatService } from '../../services/goat/goat.service';


@Component({
    selector: 'app-does',
    templateUrl: './does.component.html',
    styleUrls: ['./does.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DoesComponent {
  goatService = inject(GoatService);

  name = 'Does';
  getter = this.goatService.does;
}
