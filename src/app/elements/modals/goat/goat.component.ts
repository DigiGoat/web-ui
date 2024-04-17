import { Component, Input, type ElementRef, type OnDestroy, type OnInit, ViewChild, type AfterViewInit, ViewChildren, afterNextRender, afterRender } from '@angular/core';
import type { Goat } from '../../../services/goat/goat.service';
import { ImageService, type ImageEntry } from '../../../services/image/image.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-goat-modal',
  templateUrl: './goat.component.html',
  styleUrl: './goat.component.scss'
})
export class GoatModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input({ alias: 'goat', required: true }) goat?: Partial<Goat>;
  @Input({ required: true }) searchParam!: string;

  constructor(public imageService: ImageService, public router: Router, public route: ActivatedRoute) { }

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
    this.modal?.hide();
    this.modal?.dispose();
    this.carousel?.dispose();
  }

  @ViewChild('modal') modalElement!: ElementRef<HTMLDivElement>;
  @ViewChild('carousel') carouselElement!: ElementRef<HTMLDivElement>;
  @ViewChildren('imageRef') imagRefs?: ElementRef<HTMLImageElement>[];
  private modal?: bootstrap.Modal;
  private carousel?: bootstrap.Carousel;
  ngAfterViewInit() {
    this.modal = bootstrap?.Modal.getOrCreateInstance(this.modalElement.nativeElement);
    this.carousel = bootstrap?.Carousel.getOrCreateInstance(this.carouselElement.nativeElement);
    this.open();
    this.modalElement.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
    this.imagRefs?.forEach(image => {
      image.nativeElement.addEventListener('error', () => {
        console.warn(`[${this.nickname ?? this.name ?? this.id}]`, 'Failed to load image');
        image.nativeElement.src = this.imageService.NotFound.file;
      }, { once: true });
    });
  }

  open() {
    this.modal?.show();
  }
  close() {
    this.modal?.hide();
  }

}
