import type { Awards, OwnedGoats } from 'adga';

import { EMPTY } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GoatService {
  private handleError(error: HttpErrorResponse, reject: (reason?: any) => void) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    reject(error);
    // Return an observable with a user-facing error message.
    return EMPTY; //throwError(() => new Error('Something bad happened; please try again later.'));
  }

  constructor(private http: HttpClient) { }
  public does: Goat[] = [];
  getDoes(): Promise<Goat[]> {
    if (this.does.length) {
      console.debug('Used Does From Cache', this.does);
      return Promise.resolve(this.does);
    } else {
      return new Promise((resolve, reject) => this.http.get<Goat[]>('/assets/resources/does.json')
        .pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(err => this.handleError(err, reject)) // then handle the error)
        )
        .subscribe(data => {
          this.does = data;
          console.debug('Loaded Does From Server', data);
          resolve(data);
        }));
    }
  }
  public bucks: Goat[] = [];
  getBucks(): Promise<Goat[]> {
    if (this.bucks.length) {
      console.debug('Used Bucks From Cache', this.bucks);
      return Promise.resolve(this.bucks);
    } else {
      return new Promise((resolve, reject) => this.http.get<Goat[]>('/assets/resources/bucks.json')
        .pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(err => this.handleError(err, reject)) // then handle the error)
        )
        .subscribe(data => {
          this.bucks = data;
          console.debug('Loaded Bucks From Server', data);
          resolve(data);
        }));
    }
  }
}
//export type Goat = (OwnedGoats['result']['items'][number] & { nickname: string; description: string; awards: Awards['result']['items']; colorAndMarking: string; /*obtained?: string;*/ });
export type Goat = {
  nickname?: string;
  name: string;
  description?: string;
  normalizeId: string;
};
export const Goat = {
  nickname: 'Your Goats Farm Name',
  name: 'YOUR GOATS ADGA NAME',
  description: 'A quick description about your goat',
  normalizeId: 'PD12345',
};
