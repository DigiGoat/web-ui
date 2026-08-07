import { ChangeDetectionStrategy, Component, Input, type OnChanges } from '@angular/core';
import { findMatch, type Goat, type Kidding } from '../../services/goat/goat.service';

@Component({
  selector: 'app-breeding',
  templateUrl: './breeding.component.html',
  styleUrl: './breeding.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class BreedingComponent implements OnChanges {
  ngOnChanges() {
    if (this.breeding) {
      this.dam = { name: this.breeding.dam };
      if (this.breeding!.dam) {
        const doesMatchIndex = findMatch(this.breeding!.dam, this.does ?? []);
        if (doesMatchIndex !== -1) {
          this.dam = this.does![doesMatchIndex];
        } else {
          const referencesMatchIndex = findMatch(this.breeding!.dam, this.references ?? []);
          if (referencesMatchIndex !== -1) {
            this.dam = this.references![referencesMatchIndex];
          }
        }
      }
      this.sire = { name: this.breeding.sire };
      if (this.breeding!.sire) {
        const bucksMatchIndex = findMatch(this.breeding!.sire, this.bucks ?? []);
        if (bucksMatchIndex !== -1) {
          this.sire = this.bucks![bucksMatchIndex];
        } else {
          const referencesMatchIndex = findMatch(this.breeding!.sire, this.references ?? []);
          if (referencesMatchIndex !== -1) {
            this.sire = this.references![referencesMatchIndex];
          }
        }
      }
    }
  }
  @Input() breeding?: Kidding;
  @Input() does?: Goat[];
  @Input() bucks?: Goat[];
  @Input() references?: Goat[];

  dam?: Goat;
  sire?: Goat;

}
