import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './_components/login/login.component';
import { MembersComponent } from './_components/members/members.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { InviteComponent } from './_components/invite/invite.component';
import { ResetPasswordComponent } from './_components/reset-password/reset-password.component';
import { CreateAccountComponent } from './_components/create-account/create-account.component';


const routes: Routes = [
  {
    path: 'members',
    canActivate: [AuthGuard],
    component: MembersComponent
  },
  {
    path: 'profile/:profileId',
    canActivate: [AuthGuard],
    component: ProfileComponent
  },
  {
    path: 'invite',
    canActivate: [AuthGuard],
    component: InviteComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'create-account',
    component: LoginComponent
  },
  {
    path: 'create-account/:token',
    component: CreateAccountComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
