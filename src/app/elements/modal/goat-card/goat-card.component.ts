import { CurrencyPipe, DatePipe } from '@angular/common';
import { booleanAttribute, Component, ElementRef, Input, type OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import type { Observable } from 'rxjs';
import type { Page } from '../../../app-routing.module';
import { AgePipe } from '../../../pipes/age/age.pipe';
import { FresheningPipe } from '../../../pipes/freshening/freshening.pipe';
import { GoatService, type Goat, type LactationRecord } from '../../../services/goat/goat.service';
import { ImageService, type ImageEntry } from '../../../services/image/image.service';

@Component({
  selector: 'app-modal-goat-card',
  templateUrl: './goat-card.component.html',
  styleUrl: './goat-card.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class GoatCardComponent implements OnInit, Page {
  imageService = inject(ImageService);
  private meta = inject(Meta);
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private goatService = inject(GoatService);

  @Input({ required: true }) goat!: Goat;
  @Input({ transform: booleanAttribute, alias: 'for-sale' }) forSale?: boolean = false;
  setDescription(): void | Observable<void> {
    const agePipe = new AgePipe();
    const fresheningPipe = new FresheningPipe();
    const datePipe = new DatePipe('en-US');
    let description = '';

    const awards = this.formatAwards(this.goat.awards);
    if (this.born) {
      description += ` is a ${agePipe.transform(this.born)}`;
    } else {
      description += ' is a ';
    }
    if (this.lactation) {
      description += ` ${fresheningPipe.transform(this.lactation.lactationNumber)} freshener`;
    }
    if (this.linearAppraisal) {
      description += ` ${this.linearAppraisal.generalAppearance}${this.linearAppraisal.dairyStrength}${this.linearAppraisal.bodyCapacity}${this.goat.sex === 'Female' ? this.linearAppraisal.mammarySystem : ''}${this.linearAppraisal.finalScore}`;
    }
    if (awards?.length) {
      description += ` ${awards}`;
    }
    description += `${this.goat.sex === 'Female' ? ' doe' : ' buck'}.`;
    if (this.lactation) {
      description += ` She has produced ${this.lactation.stats?.milk?.achieved}lbs of milk${this.lactation.tests?.length ? ` (${datePipe.transform(this.lactation.tests.slice(-1)[0].testDate!)})` : ''
        } this lactation and is projected to produce ${this.lactation.stats?.milk?.projected}lbs.`;
    }
    if (description.length + (this.nickname || this.name || 'This buck').length < 160 - 29 && this.linearAppraisal) {
      description += ` ${this.goat.sex === 'Female' ? 'She' : 'He'} has ${this.goat.linearAppraisals!.length} linear appraisal${this.goat.linearAppraisals!.length !== 1 ? 's' : ''}`;
      if (description.length < 160 - 37) {
        description += ` and was last appraised ${datePipe.transform(this.linearAppraisal.appraisalDate)}.`;
      } else {
        description += '.';
      }
    }
    if (description.length + (this.nickname || this.name || 'This buck').length < 160 - 35 && this.born) {
      description += ` ${this.goat.sex === 'Female' ? 'She' : 'He'} was born on ${datePipe.transform(this.born, 'longDate')}.`;
    }
    if (description.length + (this.nickname || this.name || 'This buck').length < 120 && this.colorAndMarking) {
      description += ` ${this.goat.sex === 'Female' ? 'Her' : 'His'} coloring is: ${this.colorAndMarking}.`;
    }
    if (this.name && description.length + this.name.length <= 160) {
      description = `${this.name}${this.nickname && description.length + this.name.length + this.nickname.length + 3 <= 160 ? ` (${this.nickname})` : ''}` + description;
    } else if (this.nickname) {
      description = `${this.nickname}` + description;
    } else {
      description = `this ${this.goat.sex === 'Female' ? 'doe' : 'buck'}` + description;
    }
    description = `As of ${datePipe.transform(new Date())}, ${description.trim()}`;
    if (this.description) {
      this.meta.addTags([{ property: 'og:description', content: this.htmlToPlainText(this.description) }, { name: 'description', content: description }]);
    } else {
      this.meta.addTag({ name: 'description', content: description });
    }
    this.meta.removeTag('name="robots"');
  }
  htmlToPlainText(html: string): string {
    const doc = this.el.nativeElement.ownerDocument.createElement('div');
    doc.innerHTML = html;
    return doc.textContent || '';
  }

  name?: string;
  nickname?: string;
  description?: string;
  id?: string;
  born?: string;
  deceased?: string | null;
  animalTattoos?: { location: string; description: string; }[];
  colorAndMarking?: string;
  price?: number | string;
  images!: ImageEntry[];
  private lactation?: LactationRecord;
  private linearAppraisal?: Required<Goat>['linearAppraisals'][number];
  ngOnInit(): void {
    this.name = this.goat?.name;
    this.nickname = this.goat?.nickname;
    this.description = this.goat?.description;
    this.id = this.goat?.normalizeId;
    this.born = this.goat?.dateOfBirth;
    this.deceased = this.goat?.dateOfDeath;
    if ('tattoos' in this.goat && this.goat.tattoos) {
      this.animalTattoos = this.goat.tattoos;
    } else if ('animalTattoo' in this.goat && this.goat.animalTattoo) {
      this.animalTattoos = this.goat.animalTattoo.map(tattoo => ({ location: tattoo.tattoo || '', description: tattoo.tattooLocation?.name || '' }));
    }
    this.colorAndMarking = this.goat?.colorAndMarking;
    if (this.forSale) {
      try {
        this.price = (new CurrencyPipe('en-US')).transform(this.goat?.price) || this.price;
      } catch {
        this.price = this.goat?.price;
      }
    }
    this.images = this.imageService.getImages([this.id, this.name, this.nickname]);
    this.lactation = this.goat?.lactationRecords?.find(lactation => lactation.isCurrent);
    this.linearAppraisal = this.goatService.getAppraisal(this.goat?.linearAppraisals);
    this.setDescription();
  }
  formatAwards(awards?: Goat['awards']) {
    if (!awards || !awards.length) return '';
    return this.goatService.getAwards(awards.filter(award => award.awardCode === '*B' || award.awardCode === '*M'));
  }
}
