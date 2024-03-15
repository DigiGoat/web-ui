import { ImageEntry, ImageService } from 'src/app/services/image.service';

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
  image?: ImageEntry;
  ngOnInit(): void {
    this.name = this.goat?.name;
    this.nickname = this.goat?.nickname;
    this.description = this.goat?.description;
    this.id = this.goat?.normalizeId;
    this.image = this.imageService.getImage([this.id, this.name, this.nickname]);
  }
  @ViewChild('imageRef') imageRef?: ElementRef<HTMLImageElement>;
  ngAfterViewInit() {
    this.imageRef?.nativeElement.addEventListener('error', () => {
      console.warn(`[${this.nickname ?? this.name ?? this.id}]`, 'Failed to load image');
      if (this.imageRef) {
        this.imageRef.nativeElement.src = this.imageService.NotFound.file;
      }
    }, { once: true });
  };
}

