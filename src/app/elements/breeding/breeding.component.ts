import { Component, Input, type OnChanges } from '@angular/core';
import type { Goat, Kidding } from '../../services/goat/goat.service';

@Component({
  selector: 'app-breeding',
  templateUrl: './breeding.component.html',
  styleUrl: './breeding.component.scss'
})
export class BreedingComponent implements OnChanges {
  ngOnChanges() {
    if (this.breeding) {
      this.dam = this.does?.find(goat => goat.normalizeId === this.breeding!.dam) ?? { name: this.breeding.dam };
      this.sire = this.bucks?.find(goat => goat.normalizeId === this.breeding!.sire) ?? { name: this.breeding.sire };
    }
  }
  @Input() breeding?: Kidding;
  @Input() does?: Goat[];
  @Input() bucks?: Goat[];

  dam?: Goat;
  sire?: Goat;

}
