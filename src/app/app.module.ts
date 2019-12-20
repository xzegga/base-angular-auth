import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { LoginComponent } from './_components/login/login.component';
import { MembersComponent } from './_components/members/members.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { InviteComponent } from './_components/invite/invite.component';
import { ResetPasswordComponent } from './_components/reset-password/reset-password.component';
import { CreateAccountComponent } from './_components/create-account/create-account.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TokenInterceptor } from './_services/token-interceptor';

import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { FilterListPipe } from './_utils/filter-list.pipe';
import { ForgotPasswordComponent } from './_components/forgot-password/forgot-password.component';
import { ProfileEditComponent } from './_components/profile-edit/profile-edit.component';

import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { HeaderComponent } from './_components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UtilsModule } from './_utils/utils.module';

export function jwtTokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MembersComponent,
    ProfileComponent,
    InviteComponent,
    ResetPasswordComponent,
    CreateAccountComponent,
    FilterListPipe,
    ForgotPasswordComponent,
    ProfileEditComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        whitelistedDomains: ['localhost:9000'],
        blacklistedRoutes: ['localhost/auth/login']
      }
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-center', 
      preventDuplicates: true,
    }),
    NgxLoadingModule.forRoot({
      backdropBackgroundColour: 'rgba(0,0,0,0.8)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'}),
    DatePickerModule,
    UtilsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
