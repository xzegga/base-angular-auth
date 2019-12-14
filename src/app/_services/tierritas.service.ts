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
      return this.http.get<Profile[]>(this.basePath + 'user/', this.httpOptions);
  }

  getProfile(profileId: string): Observable<Profile> {
    return this.http.get<Profile>(this.basePath + `user/${profileId}`, this.httpOptions);
  }

  sendInvite(invite: Invite){
    return this.http.post<Invite>(this.basePath + 'invite/', invite, this.httpOptions);
  }

  signUpMember(profile: Profile){
    return this.http.post<any>(this.basePath + 'signup/', profile, this.httpOptions);
  }

  saveMember(profile: Profile){
    const routeUrl = this.basePath + 'user/' + profile.id;
    return this.http.put<any>(routeUrl, profile, this.httpOptions);
  }

  validateInviteToken(token: string){
    return this.http.post<any>(this.basePath + `validate/${token}`, this.httpOptions);
  }

  forgotPassword(email: string){
    const payload = {email};
    return this.http.post<any>(this.basePath + `forgot-password/`, payload, this.httpOptions);
  }

  updateProfileImage(){
    return null;
    // return this.http.post<any>(this.basePath + `forgot-password/`, payload, this.httpOptions);
  }

  resetPassword(payload: any){
    return this.http.post<any>(this.basePath + `reset-password/`, payload, this.httpOptions);
  }

}
