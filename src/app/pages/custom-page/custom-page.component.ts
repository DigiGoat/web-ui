import { Component, ElementRef, type OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { type CustomPage, CustomPagesService } from '../../services/custom-pages/custom-pages.service';

@Component({
  selector: 'app-custom-page',
  standalone: false,

  templateUrl: './custom-page.component.html',
  styleUrl: './custom-page.component.scss'
})
export class CustomPageComponent implements OnInit {
  customPage: CustomPage = { title: this.route.snapshot.params['customPage'].replaceAll('-', ' '), content: '' };
  document = this.el.nativeElement.ownerDocument;
  constructor(private customPageService: CustomPagesService, private route: ActivatedRoute, private title: Title, private el: ElementRef, private meta: Meta) { }
  ngOnInit(): void {
    const query = this.route.snapshot.params['customPage'];
    this.customPage = this.customPageService.getPage(query)!;
    const oldTitle = this.title.getTitle();
    const newTitle = oldTitle.replace(query.replaceAll('-', ' '), this.customPage.title);
    this.title.setTitle(newTitle);
    this.meta.updateTag({ property: 'og:title', content: newTitle });

    // Remove any existing canonical link
    const oldCanonical = this.document.querySelector('link[rel="canonical"]');
    if (oldCanonical) oldCanonical.remove();

    // Add new canonical link
    const link = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', `/${this.customPageService.urlify(this.customPage.title)}`);
    this.document.head.appendChild(link);

    this.meta.addTags([{ property: 'og:description', content: this.htmlToPlainText(this.customPage.content) }, { name: 'description', content: this.htmlToPlainText(this.customPage.content) }]);
  }

  htmlToPlainText(html: string): string {
    const doc = this.document.createElement('div');
    doc.innerHTML = html;
    return doc.textContent || '';
  }
}
