import { Injectable } from '@angular/core';

import _customPages from '../../../assets/resources/custom-pages.json';

@Injectable({
  providedIn: 'root'
})
export class CustomPagesService {
  private customPages: CustomPage[] = _customPages;
  getPage(query: string): CustomPage | undefined {
    return this.customPages.find(page => this.urlify(page.title).toLowerCase() === this.urlify(query).toLowerCase());
  }

  getPages(): CustomPageSummary[] {
    return this.customPages.map(page => ({
      title: page.title,
      url: this.urlify(page.title)
    }));
  }
  urlify(title: string): string {
    return title
      .replaceAll(' ', '-')
      .replace(/[^a-zA-Z0-9-]/g, '');
  }
}

export interface CustomPage {
  title: string;
  content: string;
}

export interface CustomPageSummary {
  title: string;
  url: string;
}
