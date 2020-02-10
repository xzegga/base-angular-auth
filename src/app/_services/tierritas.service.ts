import { Invite } from './../_models/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Profile } from '../_models/user';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

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
    private http: HttpClient,
    private sanitizer: DomSanitizer) { }

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

  deleteMember(id: number){
    const routeUrl = this.basePath + 'user/' + id;
    return this.http.delete<any>(routeUrl, this.httpOptions);
  }

  validateInviteToken(token: string){
    return this.http.post<any>(this.basePath + `validate/${token}`, this.httpOptions);
  }

  forgotPassword(email: string){
    const payload = {email};
    return this.http.post<any>(this.basePath + `forgot-password/`, payload, this.httpOptions);
  }

  updateProfileImage(formData: FormData){
    const responseType = 'blob' as 'json';
    return this.http.post<any>(this.basePath + `images/`, formData, {responseType});
  }

  getProfileImage(name: string){
    const responseType = 'blob' as 'json';
    return this.http.get<any>(this.basePath + `images/${name}`, {responseType});
  }

  resetPassword(payload: any){
    return this.http.post<any>(this.basePath + `reset-password/`, payload, this.httpOptions);
  }

  convertToUrl(blob: any) {
    const urlCreator = window.URL;
    return this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
  }


}
