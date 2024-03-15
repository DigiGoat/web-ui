import { Injectable } from '@angular/core';

import imageMap from '../../assets/images/map.json';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imageMap: ImageMap = imageMap as any;

  constructor() { }
  getImage(searchQueries: (string | undefined)[]) {
    const key = Object.keys(this.imageMap).find(directory => searchQueries.includes(directory));
    if (key && this.imageMap[key].length) {
      const image = this.imageMap[key].find(image => image.cover) || this.imageMap[key][0];
      return `./assets/images/${key}/${image.file}`;
    } else {
      return this.notFound;
    }
  }

  public readonly notFound = './assets/images/ImageNotFound.png';
}
type ImageMap = {
  [directory: string]: {
    file: string,
    description?: string;
    cover?: true;
  }[];
};
