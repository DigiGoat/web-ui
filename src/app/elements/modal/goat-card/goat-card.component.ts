import { Component, Input, ViewChild, ViewChildren, type AfterViewInit, type ElementRef, type OnDestroy, type OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import type { Goat } from '../../../services/goat/goat.service';
import { ImageService, type ImageEntry } from '../../../services/image/image.service';
import { PlatformService } from '../../../services/platform/platform.service';
import { ConfigService } from '../../../services/config/config.service';

@Component({
  selector: 'app-modal-goat-card',
  templateUrl: './goat-card.component.html',
  styleUrl: './goat-card.component.scss'
})
export class GoatCardComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input({ alias: 'goat', required: true }) goat?: Partial<Goat>;

  constructor(public imageService: ImageService, private platformService: PlatformService, private meta: Meta, private configService: ConfigService) { }

  name?: string;
  nickname?: string;
  description?: string;
  id?: string;
  born?: string | number;
  animalTattoos?: Goat['animalTattoo'];
  colorAndMarking?: string;
  images?: ImageEntry[];
  ngOnInit(): void {
    this.name = this.goat?.name;
    this.nickname = this.goat?.nickname;
    this.description = this.goat?.description;
    this.id = this.goat?.normalizeId;
    this.born = this.goat?.dateOfBirth;
    this.animalTattoos = this.goat?.animalTattoo;
    this.colorAndMarking = this.goat?.colorAndMarking;
    this.images = this.imageService.getImages([this.id, this.name, this.nickname]);
    if (this.description) {
      this.meta.addTag({ name: 'og:description', content: this.description });
    }
    for (const image of this.images) {
      this.meta.addTag({ name: 'og:image', content: this.configService.link ? new URL(image.file, this.configService.link).toString() : image.file });
      //this.meta.addTags([{ name: 'og:image:width', content: '400' }, { name: 'og:image:height', content: '200' }], true);
      if (image.description) {
        this.meta.addTag({ name: 'og:image:alt', content: image.description });
      }
    }
  }

  ngOnDestroy() {
    this.carousel?.dispose();
  }

  @ViewChild('carousel') carouselElement!: ElementRef<HTMLDivElement>;
  @ViewChildren('imageRef') imageRefs?: ElementRef<HTMLImageElement>[];
  private carousel?: bootstrap.Carousel;
  ngAfterViewInit() {
    if (this.platformService.isBrowser) {
      this.carousel = bootstrap.Carousel.getOrCreateInstance(this.carouselElement.nativeElement);
      this.imageRefs?.forEach(image => {
        image.nativeElement.addEventListener('error', () => {
          console.warn(`[${this.nickname ?? this.name ?? this.id}]`, 'Failed to load image');
          image.nativeElement.src = this.imageService.NotFound.file;
        }, { once: true });
      });
    }
  }
}
