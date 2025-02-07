import { DatePipe } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
import { findIDMatch, type Goat, GoatService } from '../../services/goat/goat.service';

@Component({
  selector: 'app-pedigree',
  templateUrl: './pedigree.component.html',
  styleUrl: './pedigree.component.scss',
  standalone: false
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
      this.dam = findIDMatch(this.goat.damId, goats);
      this.sire = findIDMatch(this.goat.sireId, goats);
      this.damDam = findIDMatch(this.dam?.damId, goats);
      this.damSire = findIDMatch(this.dam?.sireId, goats);
      this.sireDam = findIDMatch(this.sire?.damId, goats);
      this.sireSire = findIDMatch(this.sire?.sireId, goats);
    });
  }
  getPopoverContent(goat?: Goat) {
    if (!goat) return '';
    const datePipe = new DatePipe('en-US');
    const popover: string[] = [];
    if (goat.dateOfBirth) {
      popover.push(`<span class="fw-bold">Born</span>: <span class="fw-light">${datePipe.transform(goat.dateOfBirth, 'longDate')}</span>`);
    }
    if (goat.normalizeId) {
      popover.push(`<span class="fw-bold">ID</span>: <span class="fw-light">${goat.normalizeId}</span>`);
    }
    if (goat.ownerAccount?.displayName) {
      popover.push(`<span class="fw-bold">Owned By</span>: <span class="fw-light">${goat.ownerAccount.displayName}</span>`);
    }
    if (goat.linearAppraisals && goat.linearAppraisals.length) {
      const appraisal = this.goatService.getAppraisal(goat.linearAppraisals);
      popover.push(`<span class="fw-bold">${datePipe.transform(appraisal?.appraisalDate, 'YYYY')} Appraisal Score</span>: <span class="fw-light">${appraisal?.generalAppearance}${appraisal?.dairyStrength}${appraisal?.bodyCapacity}${appraisal?.mammarySystem ?? ''} ${appraisal?.finalScore}</span>`);
    }
    return `<div>${popover.join('<br>')}</div>`;
  }
  formatLinearAppraisal(appraisals?: Required<Goat>['linearAppraisals']) {
    if (!appraisals || !appraisals.length) return '';
    const appraisal = this.goatService.getAppraisal(appraisals);
    return `${appraisal?.generalAppearance}${appraisal?.dairyStrength}${appraisal?.bodyCapacity}${appraisal?.mammarySystem ?? ''} ${appraisal?.finalScore}`;
  }
}
