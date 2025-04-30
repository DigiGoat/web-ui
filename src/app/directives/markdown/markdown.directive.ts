import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, Input, type AfterViewInit } from '@angular/core';
import { PlatformService } from '../../services/platform/platform.service';

@Directive({
  selector: '[markdown]',
  standalone: false
})
export class MarkdownDirective implements AfterViewInit {

  constructor(private el: ElementRef<HTMLElement>, private http: HttpClient, private platformService: PlatformService) { }
  private iconEl!: HTMLElement;

  @Input({ alias: 'markdown' }) identifier?: string;

  async ngAfterViewInit() {
    if (!this.platformService.isDev || this.platformService.isServer) return;
    this.el.nativeElement.style.position = 'relative';
    this.iconEl = this.el.nativeElement.ownerDocument.createElement('i');
    this.iconEl.className = 'bi bi-markdown';
    this.iconEl.style.position = 'absolute';
    this.iconEl.style.top = '-5px';
    this.iconEl.style.right = '5px';
    this.iconEl.style.backgroundColor = 'transparent';
    this.iconEl.style.opacity = '0.75';
    //this.iconEl.style.opacity = '0.5';
    this.iconEl.title = 'Markdown Supported';
    this.iconEl.style.zIndex = '100';
    this.iconEl.style.cursor = 'help';
    this.iconEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-markdown" viewBox="0 0 16 16">
  <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
  <path fill-rule="evenodd" d="M9.146 8.146a.5.5 0 0 1 .708 0L11.5 9.793l1.646-1.647a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 0-.708"/>
  <path fill-rule="evenodd" d="M11.5 5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 1 .5-.5"/>
  <path d="M3.56 11V7.01h.056l1.428 3.239h.774l1.42-3.24h.056V11h1.073V5.001h-1.2l-1.71 3.894h-.039l-1.71-3.894H2.5V11z"/>
</svg>`;

    this.iconEl.addEventListener('click', () => window.open('https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax'));
    window.bootstrap.Tooltip.getOrCreateInstance(this.iconEl);
    this.showMarkdown();
  }
  async showMarkdown() {
    const value = this.el.nativeElement.innerHTML;
    this.el.nativeElement.appendChild(this.iconEl);
    let renderedValue = '';
    if (value) {
      if (this.identifier && localStorage.getItem(`markdown-${this.identifier}-raw`) === value) {
        renderedValue = localStorage.getItem(`markdown-${this.identifier}-rendered`)!;
        this.iconEl.classList.remove('text-success', 'text-warning', 'text-danger');
        this.iconEl.classList.add('text-info');
      } else {
        this.iconEl.classList.remove('text-success', 'text-warning');
        this.iconEl.classList.add('text-danger');
        try {
          renderedValue = window.marked.parse(value, { gfm: true, async: false });
        } catch (error) {
          console.warn('Failed to pre-render markdown', error);
        }
        this.iconEl.classList.remove('text-danger', 'text-success');
        this.iconEl.classList.add('text-warning');
        try {
          renderedValue = await this.renderMarkdown(value);
          this.iconEl.classList.remove('text-danger', 'text-warning');
          this.iconEl.classList.add('text-success');
          if (this.identifier) {
            localStorage.setItem(`markdown-${this.identifier}-raw`, value);
            localStorage.setItem(`markdown-${this.identifier}-rendered`, renderedValue);
          }
        } catch (error) {
          console.warn('Failed to render markdown', error);
        }
      }
      this.el.nativeElement.innerHTML = renderedValue || value;
      this.el.nativeElement.appendChild(this.iconEl);
    }
  }

  async renderMarkdown(markdown: string) {
    return await new Promise<string>((resolve, reject) => {
      this.http.post('https://api.github.com/markdown', { text: markdown, mode: 'gfm' }, { responseType: 'text' }).subscribe({
        next: response => {
          resolve(response);
        }, error: reject
      });
    });
  }
}
