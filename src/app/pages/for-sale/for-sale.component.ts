import type { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, type AfterViewInit, type ElementRef, type OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config/config.service';
import { findMatch, ForSale, Goat, GoatService } from '../../services/goat/goat.service';

@Component({
  selector: 'app-for-sale',
  standalone: false,

  templateUrl: './for-sale.component.html',
  styleUrl: './for-sale.component.scss'
})
export class ForSaleComponent implements OnInit, AfterViewInit {
  forSale?: ForSale;

  public err?: HttpErrorResponse;
  public noneForSale = false;
  public does?: Goat[];
  public bucks?: Goat[];
  public pets?: Goat[];
  public searchParam?: string;
  public activeGoatIndex = -1;
  public activeGoatType?: 'doe' | 'buck' | 'pet';
  public saleTerms?: string;


  constructor(private goatService: GoatService, private route: ActivatedRoute, private meta: Meta, private configService: ConfigService) { }
  setDescription() {
    /*let description = '';
    if (this.configService.homeTitle) {
      description += this.configService.homeTitle;
      description += ` Currently Has ${this.schedule?.length} Kiddings Scheduled`;
    } else {
      description += `The Farm Currently Has ${this.schedule?.length} Kiddings Scheduled`;
    }
    this.meta.addTags([{ property: 'og:description', content: description }, { name: 'description', content: description }]);*/
  }

  @ViewChild('termsButton') termsButton?: ElementRef<HTMLButtonElement>;
  ngOnInit() {
    this.searchParam = this.route.snapshot.params['goat'];
    this.goatService.forSale.subscribe({
      next: data => {
        this.forSale = data;
        if (!data.does?.length && !data.bucks?.length && !data.pets?.length) {
          this.noneForSale = true;
        } else if (!this.searchParam) {
          this.setDescription();
        }
        this.determineActiveGoat(data);
      },
      error: err => this.err = err
    });
    this.saleTerms = this.configService.saleTerms;
  }
  ngAfterViewInit() {
    if (this.route.snapshot.fragment?.match(/terms|pricing/i)) {
      this.termsButton?.nativeElement.click();
    }
  }

  determineActiveGoat(goatsForSale: ForSale) {
    if (this.searchParam) {
      if (this.activeGoatIndex === -1 && goatsForSale.does) {
        this.activeGoatIndex = findMatch(this.searchParam, goatsForSale.does);
        this.activeGoatType = 'doe';
      }
      if (this.activeGoatIndex === -1 && goatsForSale.bucks) {
        this.activeGoatIndex = findMatch(this.searchParam, goatsForSale.bucks);
        this.activeGoatType = 'buck';
      }
      if (this.activeGoatIndex === -1 && goatsForSale.pets) {
        this.activeGoatIndex = findMatch(this.searchParam, goatsForSale.pets);
        this.activeGoatType = 'pet';
      }
    }
  }
}
