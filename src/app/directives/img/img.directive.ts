import { Directive, ElementRef, OnInit } from '@angular/core';
import { ImageService } from '../../services/image/image.service';

@Directive({
  selector: 'img'
})
export class ImgDirective implements OnInit {
  constructor(private el: ElementRef<HTMLImageElement>, private imageService: ImageService) { }

  ngOnInit() {
    this.el.nativeElement.classList.add('placeholder');
    if (!this.el.nativeElement.parentElement!.classList.contains('placeholder-glow')) {
      this.el.nativeElement.parentElement!.classList.add('placeholder-wave');
    }
    this.el.nativeElement.addEventListener('load', () => {
      this.el.nativeElement.classList.remove('placeholder');
      this.el.nativeElement.parentElement!.classList.remove('placeholder-wave');
      this.el.nativeElement.parentElement!.classList.remove('placeholder-glow');
    });
    this.el.nativeElement.addEventListener('error', () => this.el.nativeElement.src = this.imageService.NotFound.file, { once: true });
  }
}
