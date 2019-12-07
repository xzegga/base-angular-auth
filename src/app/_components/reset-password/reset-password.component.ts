import { AuthService } from './../../_services/auth.service';
import { TierritasService } from 'src/app/_services/tierritas.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {ResetPassword} from '../../_models/user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public loading: boolean;
  subscriptions: Array<Subscription> = [];

  password: ResetPassword = new ResetPassword();
  token: string;
  currentRoute: string;

  constructor(
    private tierritasService: TierritasService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private authService: AuthService) {
      this.currentRoute = this.route.url;
   }

  ngOnInit() {

    const loadingSubscription = this.authService.loading$.subscribe((loading: boolean) => this.loading = loading);
    const routeSubscription = this.activatedRoute.paramMap.subscribe(map => {
      this.onRouteChanged(map);
    });


    this.subscriptions = [
      routeSubscription,
      loadingSubscription
    ];
  }

  resetPassword(){
    this.authService.setLoading(true);
    this.tierritasService.resetPassword(this.password).subscribe(response => {
      this.authService.setLoading(false);
    });
  }

  onRouteChanged(map: ParamMap) {
    this.password.token = map.get('token');
    this.authService.setLoading(true);
    this.tierritasService.validateInviteToken(this.password.token).subscribe(response => {
        if (response === 'invalid') {
           this.route.navigateByUrl('login');
        }
        this.authService.setLoading(false);
      }
    )
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }
}
