import { Invite } from './../_models/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Profile } from '../_models/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TierritasService {
  basePath = environment.api_url;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private router: Router,
    private http: HttpClient) { }

  getMembers(): Observable<Profile[]> {
      return this.http
        .get<Profile[]>(this.basePath + 'user/', this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
  }

  getProfile(profileId: string): Observable<Profile> {
    return this.http
    .get<Profile>(this.basePath + `user/${profileId}`, this.httpOptions)
    .pipe(
        catchError(this.handleError)
    );
  }

  sendInvite(invite: Invite){
    return this.http
    .post<Invite>(this.basePath + 'invite/', invite, this.httpOptions)
    .pipe(
        catchError(this.handleError)
    );
  }

  createAccount(){

  }

  resetPassword(){

  }

    // Handle API errors
    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    }
}
