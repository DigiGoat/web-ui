import type { HttpErrorResponse } from '@angular/common/http';
import { Component, type OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config/config.service';
import { findMatch, ForSale, Goat, GoatService } from '../../services/goat/goat.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-for-sale',
  standalone: false,

  templateUrl: './for-sale.component.html',
  styleUrl: './for-sale.component.scss'
})
export class ForSaleComponent implements OnInit {
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
    const datePipe = new DatePipe('en-US');
    let description = `As of ${datePipe.transform(new Date())}, `;
    if (this.configService.title) {
      description += this.configService.title;
      description += ' Currently Has';
    } else {
      description += 'The Farm Currently Has';
    }
    const totalForSale = (this.forSale?.does?.length ?? 0) + (this.forSale?.bucks?.length ?? 0) + (this.forSale?.pets?.length ?? 0);
    if (totalForSale) {
      description += ` ${totalForSale} Goat${totalForSale > 1 ? 's' : ''} For Sale:`;
      if (this.forSale?.does?.length) {
        description += ` ${this.forSale.does.length} Doe${this.forSale.does.length > 1 ? 's' : ''}`;
        if (this.forSale?.bucks?.length && this.forSale?.pets?.length) {
          description += ',';
        } else if (this.forSale?.bucks?.length || this.forSale?.pets?.length) {
          description += ' and';
        }
      }
      if (this.forSale?.bucks?.length) {
        description += ` ${this.forSale.bucks.length} Buck${this.forSale.bucks.length > 1 ? 's' : ''}`;
        if (this.forSale?.pets?.length) {
          description += ' and';
        }
      }
      if (this.forSale?.pets?.length) {
        description += ` ${this.forSale.pets.length} Pet${this.forSale.pets.length > 1 ? 's' : ''}`;
      }
    } else {
      description += ' No Goats For Sale';
    }
    this.meta.addTags([{ property: 'og:description', content: description }, { name: 'description', content: description }]);
  }

  ngOnInit() {
    this.searchParam = this.route.snapshot.params['goat'];
    this.goatService.forSale.subscribe({
      next: data => {
        this.forSale = data;
        if (!data.does?.length && !data.bucks?.length && !data.pets?.length) {
          this.noneForSale = true;
        }
        if (!this.searchParam) {
          this.setDescription();
        }
        this.determineActiveGoat(data);
      },
      error: err => this.err = err
    });
    this.saleTerms = this.configService.saleTerms;
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
