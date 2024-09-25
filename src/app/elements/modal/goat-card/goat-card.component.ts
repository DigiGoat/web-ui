import { Component, ElementRef, Input, type OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import type { Observable } from 'rxjs';
import type { Page } from '../../../app-routing.module';
import type { Goat } from '../../../services/goat/goat.service';
import { ImageService, type ImageEntry } from '../../../services/image/image.service';

@Component({
  selector: 'app-modal-goat-card',
  templateUrl: './goat-card.component.html',
  styleUrl: './goat-card.component.scss'
})
export class GoatCardComponent implements OnInit, Page {
  @Input({ required: true }) goat!: Goat;

  constructor(public imageService: ImageService, private meta: Meta, private el: ElementRef<HTMLElement>) { }
  setDescription(): void | Observable<void> {
    if (this.description) {
      this.meta.addTags([{ property: 'og:description', content: this.htmlToPlainText(this.description) }, { name: 'description', content: this.htmlToPlainText(this.description) }]);
    }
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
  animalTattoos?: Goat['animalTattoo'];
  colorAndMarking?: string;
  images!: ImageEntry[];
  ngOnInit(): void {
    this.name = this.goat?.name;
    this.nickname = this.goat?.nickname;
    this.description = this.goat?.description;
    this.id = this.goat?.normalizeId;
    this.born = this.goat?.dateOfBirth;
    this.animalTattoos = this.goat?.animalTattoo;
    this.colorAndMarking = this.goat?.colorAndMarking;
    this.images = this.imageService.getImages([this.id, this.name, this.nickname]);
    this.setDescription();
  }
}
