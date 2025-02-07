import { AfterViewInit, Component, Input, ViewChild, type ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sale-terms',
  standalone: false,

  templateUrl: './sale-terms.component.html',
  styleUrl: './sale-terms.component.scss'
})
export class SaleTermsComponent implements AfterViewInit {
  @Input({ alias: 'sale-terms', required: true }) saleTerms: string = '';
  constructor(private route: ActivatedRoute) { }
  @ViewChild('termsButton') termsButton?: ElementRef<HTMLButtonElement>;
  ngAfterViewInit() {
    if (this.route.snapshot.fragment?.match(/terms|pricing/i)) {
      this.termsButton?.nativeElement.click();
    }
  }
}
