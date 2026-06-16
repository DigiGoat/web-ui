import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GoatService } from '../../services/goat/goat.service';

@Component({
    selector: 'app-references',
    templateUrl: './references.component.html',
    styleUrl: './references.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ReferencesComponent {
  goatService = inject(GoatService);

  name = 'References';
  getter = this.goatService.references;
}
