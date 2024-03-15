import { Component } from '@angular/core';

import { GoatService } from '../services/goat.service';


@Component({
  selector: 'app-does',
  templateUrl: './does.component.html',
  styleUrls: ['./does.component.scss']
})
export class DoesComponent {
  constructor(public goatService: GoatService) { }
}
