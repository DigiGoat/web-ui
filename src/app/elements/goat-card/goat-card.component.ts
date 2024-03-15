import { ImageService } from 'src/app/services/image.service';

import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';


import type { Goat } from 'src/app/services/goat.service';
@Component({
  selector: 'app-goat-card',
  templateUrl: './goat-card.component.html',
  styleUrls: ['./goat-card.component.scss']
})
export class GoatCardComponent implements OnInit, AfterViewInit {

  constructor(private imageService: ImageService) { }

  @Input('goat') goat?: Partial<Goat>;
  name?: string;
  nickname?: string;
  description?: string;
  id?: string;
  imageSrc?: string;
  ngOnInit(): void {
    this.name = this.goat?.name;
    this.nickname = this.goat?.nickname;
    this.description = this.goat?.description;
    this.id = this.goat?.normalizeId;
    this.imageSrc = this.imageService.getImage([this.id, this.name, this.nickname]);
  }
  @ViewChild('image') image?: ElementRef<HTMLImageElement>;
  ngAfterViewInit() {
    this.image?.nativeElement.addEventListener('error', () => {
      console.warn(`[${this.nickname ?? this.name ?? this.id}]`, 'Failed to load image');
      if (this.image) {
        this.image.nativeElement.src = this.imageService.notFound;
      }
    }, { once: true });
  };
}

