import { Component, ElementRef, type OnInit } from '@angular/core';
import { PlatformService } from '../../services/platform/platform.service';

@Component({
  selector: 'markdown-compiler',
  templateUrl: './markdown.component.html',
  styleUrl: './markdown.component.scss',
  standalone: false,
})
export class MarkdownComponent implements OnInit {
  constructor(private platformService: PlatformService, private el: ElementRef<HTMLElement>) { }
  private document = this.el.nativeElement.ownerDocument;
  ngOnInit() {
    if (this.platformService.isServer) {
      if (this.platformService.isDev) {
        const script = this.document.createElement('script');
        script.src = 'markdown.js';
        this.document.body.appendChild(script);
      } else {
        const script = this.document.createComment('Markdown Rendering disabled in production');
        this.document.body.appendChild(script);
      }
    }
  }
}
