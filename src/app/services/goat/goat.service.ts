import type { LAClassifications } from 'adga';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GoatService {
  constructor(private http: HttpClient) { }
  private _does: Goat[] = [];
  public does = new Observable<Goat[]>(observer => {
    if (this._does.length) {
      console.debug('Loaded Does From Cache', this._does);
      observer.next(this._does);
    } else {
      this.http.get<Goat[]>('./assets/resources/does.json')
        .pipe(
          retry(3), // retry a failed request up to 3 times
        )
        .subscribe({
          next: data => {
            this._does = data;
            console.debug('Loaded Does From Server', data);
            observer.next(data);
          },
          error: err => {
            if (err.status === 0) {
              // A client-side or network error occurred. Handle it accordingly.
              console.warn('An error occurred:', err.error);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong.
              console.warn(
                `Backend returned code ${err.status}, body was: `, err.error);
            }
            // Return an observable with a user-facing error message.
            observer.error(err);
          }
        });
    }
  });
  private _bucks: Goat[] = [];
  public bucks = new Observable<Goat[]>(observer => {
    if (this._bucks.length) {
      console.debug('Loaded Bucks From Cache', this._bucks);
      observer.next(this._bucks);
    } else {
      this.http.get<Goat[]>('./assets/resources/bucks.json')
        .pipe(
          retry(3), // retry a failed request up to 3 times
        )
        .subscribe({
          next: data => {
            this._bucks = data;
            console.debug('Loaded Bucks From Server', data);
            observer.next(data);
          },
          error: err => {
            if (err.status === 0) {
              // A client-side or network error occurred. Handle it accordingly.
              console.warn('An error occurred:', err.error);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong.
              console.warn(
                `Backend returned code ${err.status}, body was: `, err.error);
            }
            // Return an observable with a user-facing error message.
            observer.error(err);
          }
        });
    }
  });
  private _related: Goat[] = [];
  public related = new Observable<Goat[]>(observer => {
    if (this._related.length) {
      console.debug('Loaded Related Goats From Cache', this._related);
      observer.next(this._related);
    } else {
      this.http.get<Goat[]>('./assets/resources/related.json')
        .pipe(
          retry(3), // retry a failed request up to 3 times
        )
        .subscribe({
          next: data => {
            this._related = data;
            console.debug('Loaded Relatives From Server', data);
            observer.next(data);
          },
          error: err => {
            if (err.status === 0) {
              // A client-side or network error occurred. Handle it accordingly.
              console.warn('An error occurred:', err.error);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong.
              console.warn(
                `Backend returned code ${err.status}, body was: `, err.error);
            }
            // Return an observable with a user-facing error message.
            observer.error(err);
          }
        });
    }
  });

  private _references: Goat[] = [];
  public references = new Observable<Goat[]>(observer => {
    if (this._references.length) {
      console.debug('Loaded References From Cache', this._references);
      observer.next(this._references);
    } else {
      this.http.get<Goat[]>('./assets/resources/references.json')
        .pipe(
          retry(3), // retry a failed request up to 3 times
        )
        .subscribe({
          next: data => {
            this._references = data;
            console.debug('Loaded References From Server', data);
            observer.next(data);
          },
          error: err => {
            if (err.status === 0) {
              // A client-side or network error occurred. Handle it accordingly.
              console.warn('An error occurred:', err.error);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong.
              console.warn(
                `Backend returned code ${err.status}, body was: `, err.error);
            }
            // Return an observable with a user-facing error message.
            observer.error(err);
          }
        });
    }
  });

  private _kidding: Kidding[] = [];
  public kidding = new Observable<Kidding[]>(observer => {
    if (this._kidding.length) {
      console.debug('Loaded Kidding Schedule From Cache', this._kidding);
      observer.next(this._kidding);
    } else {
      this.http.get<Kidding[]>('./assets/resources/kidding-schedule.json')
        .pipe(
          retry(3), // retry a failed request up to 3 times
        )
        .subscribe({
          next: data => {
            this._kidding = data;
            console.debug('Loaded Kidding Schedule From Server', data);
            observer.next(data);
          },
          error: err => {
            if (err.status === 0) {
              // A client-side or network error occurred. Handle it accordingly.
              console.warn('An error occurred:', err.error);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong.
              console.warn(
                `Backend returned code ${err.status}, body was: `, err.error);
            }
            // Return an observable with a user-facing error message.
            observer.error(err);
          }
        });
    }
  });

  private _forSale: ForSale = {};
  public forSale = new Observable<ForSale>(observer => {
    if (this._forSale.does?.length || this._forSale.bucks?.length || this._forSale.pets?.length) {
      console.debug('Loaded Goats For Sale From Cache', this._forSale);
      observer.next(this._forSale);
    } else {
      this.http.get<Goat[]>('./assets/resources/for-sale.json')
        .pipe(
          retry(3), // retry a failed request up to 3 times
        )
        .subscribe({
          next: data => {
            const forSale = {
              does: data.filter(goat => (goat.sex === 'Female' || !goat.sex) && !goat.pet),
              bucks: data.filter(goat => goat.sex === 'Male' && !goat.pet),
              pets: data.filter(goat => goat.pet),
            };
            this._forSale = forSale;
            console.debug('Loaded Goats For Sale From Server', data);
            observer.next(forSale);
          },
          error: err => {
            if (err.status === 0) {
              // A client-side or network error occurred. Handle it accordingly.
              console.warn('An error occurred:', err.error);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong.
              console.warn(
                `Backend returned code ${err.status}, body was: `, err.error);
            }
            // Return an observable with a user-facing error message.
            observer.error(err);
          }
        });
    }
  });

  public getAppraisal(appraisals: Goat['linearAppraisals']) {
    if (appraisals && appraisals.length) {
      const permanentScores = appraisals.filter(appraisal => appraisal.isPermanent);
      if (permanentScores.length) {
        return permanentScores.reduce((prev, current) => ((prev.finalScore ?? 0) > (current.finalScore ?? 0)) ? prev : current);
      } else {
        return appraisals.reduce((prev, current) => (new Date((prev.appraisalDate ?? 0)) > new Date((current.appraisalDate ?? 0))) ? prev : current);
      }
    }
    return;
  }

  public getAwards(awards: Goat['awards'], full?: boolean) {
    if (awards && awards.length) {
      awards = awards.filter(award => !(award.awardCode?.includes('CH') || award.awardCode?.includes('SG')));
      if (!awards.length) return;
      const _awards: Record<string, number> = {};
      for (const award of awards) {
        if (full && award.awardDescription) {
          if (_awards[award.awardDescription]) {
            _awards[award.awardDescription] += award.awardCount ?? 1;
          } else {
            _awards[award.awardDescription] = award.awardCount ?? 1;
          }
        } else if (!full && award.awardCode) {
          if (_awards[award.awardCode]) {
            _awards[award.awardCode] += award.awardCount ?? 1;
          } else {
            _awards[award.awardCode] = award.awardCount ?? 1;
          }
        }
      }
      return Object.keys(_awards).map(key => `${_awards[key] === 1 ? '' : _awards[key]}${key}`).join('; ');
    }
    return;
  }
}
//export type Goat = (OwnedGoats['result']['items'][number] & { nickname: string; description: string; awards: Awards['result']['items']; colorAndMarking: string; /*obtained?: string;*/ });
export type Goat = Partial<{
  nickname: string;
  name: string;
  description: string;
  normalizeId: string;
  dateOfBirth: string;
  dateOfDeath: string | null;
  colorAndMarking: string;
  animalTattoo: { tattoo?: string; tattooLocation?: { name?: string } }[];
  id: number;
  sex: 'Female' | 'Male';
  damId: number;
  sireId: number;
  ownerAccount: { displayName?: string };
  linearAppraisals: Partial<{
    lactationNumber: number;
    appraisalDate: string;
    generalAppearance: LAClassifications;
    dairyStrength: LAClassifications;
    bodyCapacity: LAClassifications;
    mammarySystem: LAClassifications;
    finalScore: number;
    isPermanent: boolean;
    id: number;
  }>[];
  pet: boolean;
  price: number | string;
  awards: Partial<{
    awardCode: string;
    awardDescription: string;
    awardYear: number;
    awardCount: number;
  }>[];
  usdaId: string;
  usdaKey: string | number;
  lactationRecords: LactationRecord[];
}>;
export type LactationRecord = Partial<{
  startDate: string;
  isCurrent: boolean;
  lactationNumber: string;
  daysInMilk: string;
  stats: Partial<{
    milk: Partial<{
      achieved: string;
      projected: string;
    }>;
    butterfat: Partial<{
      achieved: string;
      projected: string;
    }>;
    protein: Partial<{
      achieved: string;
      projected: string;
    }>;
  }>;
  tests: Partial<{
    testNumber: number;
    daysInMilk: string;
    milk: string;
    butterfatPct: string;
    proteinPct: string;
    testDate: string;
  }>[];
}>;
export type Kidding = Partial<{
  dam: string;
  sire: string;
  exposed: string;
  due: string;
  kidded: string;
  description: string;
}>;

export type ForSale = Partial<{
  does: Goat[];
  bucks: Goat[];
  pets: Goat[];
}>;
export const Goat = {
  nickname: 'Your Goats Farm Name',
  name: 'YOUR GOATS ADGA NAME',
  description: 'A quick description about your goat',
  normalizeId: 'PD12345',
};

export function findMatch(searchParam: string, goats: Goat[]): number {
  let activeGoatIndex = goats?.findIndex(goat => [goat.nickname, goat.name, goat.normalizeId].includes(searchParam));
  if (activeGoatIndex === -1) {
    activeGoatIndex = goats?.findIndex(goat => [goat.nickname, goat.name, goat.normalizeId].map(param => param?.toLowerCase()).includes(searchParam?.toLowerCase()));
  }
  if (activeGoatIndex === -1) {
    searchParam = searchParam.replace(/-/g, ' ');
    activeGoatIndex = goats?.findIndex(goat => [goat.nickname, goat.name, goat.normalizeId].map(param => param?.toLowerCase().replace(/-/g, ' ')).includes(searchParam?.toLowerCase()));
  }
  return activeGoatIndex;
}
export function findIDMatch(id: string | number | undefined, goats: Goat[]): Goat | undefined {
  if (!id) return;
  const goatMatch = goats.find(goat => [goat.id?.toString(), goat.normalizeId].includes(id.toString()));
  return goatMatch;
}
