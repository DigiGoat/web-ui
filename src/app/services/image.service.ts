import { Injectable } from '@angular/core';

import imageMap from '../../assets/images/map.json';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imageMap: ImageMap = imageMap as any;

  constructor() { }
  getImage(id?: string) {
    const key = Object.keys(this.imageMap).find(directory => directory === id);
    if (key && this.imageMap[key].length) {
      return `./assets/images/${this.imageMap[key].find(image => image.cover) || this.imageMap[key][0]}`;
    } else {
      return this.notFound;
    }
  }

  public readonly notFound = './assets/images/ImageNotFound.png';
}
type ImageMap = {
  [directory: string]: {
    image: string,
    description?: string;
    cover?: true;
  }[];
};
