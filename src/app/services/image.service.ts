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
      return { ...image, file: `./assets/images/${key}/${image.file}` };
    }
    return this.NotFound;
  }

  public readonly NotFound: ImageEntry = { file: './assets/images/ImageNotFound.png', description: 'The Requested Image Does Not Exist' };
}
type ImageMap = {
  [directory: string]: ImageEntry[];
};
export type ImageEntry = {
  file: string,
  description?: string;
  cover?: true;
};
