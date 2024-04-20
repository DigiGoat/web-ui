import { Component, Input, ViewChild, ViewChildren, type AfterViewInit, type ElementRef, type OnDestroy, type OnInit } from '@angular/core';
import type { Goat } from '../../../services/goat/goat.service';
import { ImageService, type ImageEntry } from '../../../services/image/image.service';
import { PlatformService } from '../../../services/platform/platform.service';

@Component({
  selector: 'app-modal-goat-card',
  templateUrl: './goat-card.component.html',
  styleUrl: './goat-card.component.scss'
})
export class GoatCardComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input({ alias: 'goat', required: true }) goat?: Partial<Goat>;

  constructor(public imageService: ImageService, private platformService: PlatformService) { }

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
  }

  ngOnDestroy() {
    this.carousel?.dispose();
  }

  @ViewChild('carousel') carouselElement!: ElementRef<HTMLDivElement>;
  @ViewChildren('imageRef') imagRefs?: ElementRef<HTMLImageElement>[];
  private carousel?: bootstrap.Carousel;
  ngAfterViewInit() {
    if (this.platformService.isBrowser) {
      this.carousel = bootstrap.Carousel.getOrCreateInstance(this.carouselElement.nativeElement);
      this.imagRefs?.forEach(image => {
        image.nativeElement.addEventListener('error', () => {
          console.warn(`[${this.nickname ?? this.name ?? this.id}]`, 'Failed to load image');
          image.nativeElement.src = this.imageService.NotFound.file;
        }, { once: true });
      });
    }
  }
}
