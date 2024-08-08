import { DatePipe } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
import { type Goat, GoatService } from '../../services/goat/goat.service';

@Component({
  selector: 'app-pedigree',
  templateUrl: './pedigree.component.html',
  styleUrl: './pedigree.component.scss'
})
export class PedigreeComponent implements OnInit {
  @Input({ required: true }) goat!: Goat;
  dam?: Goat;
  sire?: Goat;
  damDam?: Goat;
  damSire?: Goat;
  sireDam?: Goat;
  sireSire?: Goat;
  constructor(private goatService: GoatService) { }
  ngOnInit() {
    this.goatService.related.subscribe(goats => {
      this.dam = goats.find(goat => goat.id === this.goat.damId);
      this.sire = goats.find(goat => goat.id === this.goat.sireId);
      this.damDam = goats.find(goat => goat.id === this.dam?.damId);
      this.damSire = goats.find(goat => goat.id === this.dam?.sireId);
      this.sireDam = goats.find(goat => goat.id === this.sire?.damId);
      this.sireSire = goats.find(goat => goat.id === this.sire?.sireId);
    }
    );
  }
  getPopoverContent(goat?: Goat) {
    if (!goat) return '';
    const datePipe = new DatePipe('en-US');
    let popover = '<div>';
    if (goat.dateOfBirth) {
      popover += `<span class="fw-bold">Born</span>: <span class="fw-light">${datePipe.transform(goat.dateOfBirth, 'longDate')}</span>`;
    }
    if (goat.normalizeId) {
      popover += `<br><span class="fw-bold">ID</span>: <span class="fw-light">${goat.normalizeId}</span>`;
    }
    if (goat.ownerAccount?.displayName) {
      popover += `<br><span class="fw-bold">Owned By</span>: <span class="fw-light">${goat.ownerAccount.displayName}</span>`;
    }
    popover += '</div>';
    return popover;
  }
}
