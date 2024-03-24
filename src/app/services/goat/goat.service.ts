import { EMPTY, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GoatService {
  private handleError(error: HttpErrorResponse, observer: { error: (reason?: any) => void; }) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.warn('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.warn(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    observer.error(error);
    return EMPTY;
  }

  constructor(private http: HttpClient) { }
  public get does() {
    return this._does;
  }
  private _does: Goat[] = [];
  public getDoes = new Observable<Goat[]>(observer => {
    this.http.get<Goat[]>('/assets/resources/does.json')
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(err => this.handleError(err, observer)) // then handle the error)
      )
      .subscribe(data => {
        this._does = data;
        console.debug('Loaded Does From Server', data);
        observer.next(data);
      });
  });
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
