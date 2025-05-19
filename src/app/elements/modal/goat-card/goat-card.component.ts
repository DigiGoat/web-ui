import { CurrencyPipe } from '@angular/common';
import { booleanAttribute, Component, ElementRef, Input, type OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import type { Observable } from 'rxjs';
import type { Page } from '../../../app-routing.module';
import { AgePipe } from '../../../pipes/age/age.pipe';
import type { Goat } from '../../../services/goat/goat.service';
import { ImageService, type ImageEntry } from '../../../services/image/image.service';

@Component({
  selector: 'app-modal-goat-card',
  templateUrl: './goat-card.component.html',
  styleUrl: './goat-card.component.scss',
  standalone: false
})
export class GoatCardComponent implements OnInit, Page {
  @Input({ required: true }) goat!: Goat;
  @Input({ transform: booleanAttribute, alias: 'for-sale' }) forSale?: boolean = false;

  constructor(public imageService: ImageService, private meta: Meta, private el: ElementRef<HTMLElement>) { }
  setDescription(): void | Observable<void> {
    if (this.description) {
      this.meta.addTags([{ property: 'og:description', content: this.htmlToPlainText(this.description) }, { name: 'description', content: this.htmlToPlainText(this.description) }]);
    } else {
      const agePipe = new AgePipe();
      let description = '';
      if (this.born) {
        if (this.name) {
          description += `${this.name}${this.nickname ? ` ("${this.nickname}") ` : ' '}is ${agePipe.transform(this.born)}.`;
        } else if (this.nickname) {
          description += `${this.nickname} is ${agePipe.transform(this.born)}.`;
        }
      }
      if (this.colorAndMarking) {
        if (this.born) {
          description += ` ${this.goat.sex === 'Female' ? 'Her coloring is' : 'His coloring is'} ${this.colorAndMarking}.`;
        } else {
          if (this.name) {
            description += ` ${this.name}${this.nickname ? ` ("${this.nickname}") ` : ' '}is a ${this.colorAndMarking}.`;
          } else if (this.nickname) {
            description += ` ${this.nickname}'s coloring is ${this.colorAndMarking}.`;
          }
        }
      }
      this.meta.addTags([{ property: 'og:description', content: description }, { name: 'description', content: description }]);
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
  animalTattoos?: Goat['animalTattoo'];
  colorAndMarking?: string;
  price?: number | string;
  images!: ImageEntry[];
  ngOnInit(): void {
    this.name = this.goat?.name;
    this.nickname = this.goat?.nickname;
    this.description = this.goat?.description;
    this.id = this.goat?.normalizeId;
    this.born = this.goat?.dateOfBirth;
    this.deceased = this.goat?.dateOfDeath;
    this.animalTattoos = this.goat?.animalTattoo;
    this.colorAndMarking = this.goat?.colorAndMarking;
    if (this.forSale) {
      try {
        this.price = (new CurrencyPipe('en-US')).transform(this.goat?.price) || this.price;
      } catch {
        this.price = this.goat?.price;
      }
    }
    this.images = this.imageService.getImages([this.id, this.name, this.nickname]);
    this.setDescription();
  }
}
