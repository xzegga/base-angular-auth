import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoginResponse } from '../_models/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // API path
  basePath = environment.api_url;
  loading$ = new Subject();

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Ha ocurrido un error:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(
      //  `Backend returned code ${error.status}, ` +
      //  `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Parece que algo anda mal con el usuario y contraseña ingresado, por favor vuelve a intentarlo');
  }


  // Verify user credentials on server to get token
  loginForm(data): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.basePath + 'auth/login', data, this.httpOptions)
      .pipe(
          catchError(this.handleError)
      );
  }

  // After login save token and other values(if any) in localStorage
  setUser(resp: LoginResponse) {
    localStorage.setItem('access_token', resp.Authorization);
    this.router.navigate(['/members']);
  }

  // Checking if token is set
  isLoggedIn() {
    return localStorage.getItem('access_token') != null;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    console.log(decoded["exp"]);
    if (decoded["exp"] === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded["exp"]);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getJwtToken();
    if(token) {
      const date = this.getTokenExpirationDate(token);
      if(date === undefined) return false;
      
      return !(date.valueOf() > new Date().valueOf());
    };    
  }


  getJwtToken() {
    return localStorage.getItem('access_token');
  }

  getDecodedAccessToken(token: string): any {
    try{
        return  jwt_decode(token);
    } catch (Error) {
        return null;
    }
  }

  refreshToken() {
    return of({});
  }

  // After clearing localStorage redirect to login screen
  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  redirect() {
    this.router.navigate(['/auth/login']);
  }


  // Get data from server for Dashboard
  getData(data): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.basePath + 'user', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  setLoading(loading: boolean){
    this.loading$.next(loading);
  }

}
