import { Component } from '@angular/core';
import { GoatService } from '../../services/goat/goat.service';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss'
})
export class ReferencesComponent {
  name = 'References';
  getter = this.goatService.references;
  constructor(public goatService: GoatService) { }
}
