import { AfterViewInit, Component, Input, ViewChild, type ElementRef, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sale-terms',
  standalone: false,

  templateUrl: './sale-terms.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './sale-terms.component.scss'
})
export class SaleTermsComponent implements AfterViewInit {
  private route = inject(ActivatedRoute);

  @Input({ alias: 'sale-terms', required: true }) saleTerms = '';
  @ViewChild('termsButton') termsButton?: ElementRef<HTMLButtonElement>;
  ngAfterViewInit() {
    if (this.route.snapshot.fragment?.match(/terms|pricing/i)) {
      this.termsButton?.nativeElement.click();
    }
  }
}
