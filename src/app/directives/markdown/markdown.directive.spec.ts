import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PlatformService } from '../../services/platform/platform.service';
import { MarkdownDirective } from './markdown.directive';

const bootstrap = { Tooltip: { getOrCreateInstance: jest.fn().mockReturnValue({ dispose: jest.fn(), setContent: jest.fn() }) } };

describe('MarkdownDirective', () => {
  let directive: MarkdownDirective;
  let el: ElementRef<HTMLElement>;
  let platformService: jest.Mocked<PlatformService>;
  let httpMock: { post: jest.Mock };

  beforeEach(() => {
    (window as unknown as { bootstrap: object }).bootstrap = bootstrap;

    const platformServiceMock = {
      isDev: false,
      isServer: false,
    } as jest.Mocked<PlatformService>;

    httpMock = {
      post: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: PlatformService, useValue: platformServiceMock },
        { provide: ElementRef, useValue: { nativeElement: document.createElement('div') } },
        { provide: 'HttpClient', useValue: httpMock },
      ],
    });

    platformService = TestBed.inject(PlatformService) as jest.Mocked<PlatformService>;
    el = TestBed.inject(ElementRef);
    directive = new MarkdownDirective(el, httpMock as any, platformService);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should call http post method when rendering markdown', async () => {
    platformService.isDev = true;
    platformService.isServer = false;

    el.nativeElement.innerHTML = '**bold text**';

    httpMock.post.mockResolvedValue('<p><strong>bold text</strong></p>');

    directive.ngAfterViewInit();
    await directive.showMarkdown();

    expect(httpMock.post).toHaveBeenCalledWith(
      'https://api.github.com/markdown',
      { text: '**bold text**', mode: 'gfm' },
      { responseType: 'text' }
    );
    //expect(el.nativeElement.innerHTML).toContain('<p><strong>bold text</strong></p>');
  });
});
