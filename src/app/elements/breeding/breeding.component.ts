import { Component, Input, type OnChanges } from '@angular/core';
import { findIDMatch, type Goat, type Kidding } from '../../services/goat/goat.service';

@Component({
  selector: 'app-breeding',
  templateUrl: './breeding.component.html',
  styleUrl: './breeding.component.scss',
  standalone: false
})
export class BreedingComponent implements OnChanges {
  ngOnChanges() {
    if (this.breeding) {
      this.dam = findIDMatch(this.breeding!.dam, [...(this.does ?? []), ...(this.references ?? [])]) ?? { name: this.breeding.dam };
      this.sire = findIDMatch(this.breeding!.sire, [...(this.bucks ?? []), ...(this.references ?? [])]) ?? { name: this.breeding.sire };
      //this.dam = this.does?.find(goat => goat.normalizeId === this.breeding!.dam) ?? this.references?.find(goat => goat.normalizeId === this.breeding!.dam) ?? { name: this.breeding.dam };
      //this.sire = this.bucks?.find(goat => goat.normalizeId === this.breeding!.sire) ?? this.references?.find(goat => goat.normalizeId === this.breeding!.sire) ?? { name: this.breeding.sire };
    }
  }
  @Input() breeding?: Kidding;
  @Input() does?: Goat[];
  @Input() bucks?: Goat[];
  @Input() references?: Goat[];

  dam?: Goat;
  sire?: Goat;

}
