import { TierritasService } from 'src/app/_services/tierritas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {ResetPassword} from '../../_models/user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public loading = false;
  password: ResetPassword = new ResetPassword();
  subscriptions: Array<Subscription> = [];
  token: string;

  constructor(private tierritasService: TierritasService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    const routeSubscription = this.activatedRoute.paramMap.subscribe(map => {
      this.onRouteChanged(map);
    });

    this.subscriptions = [
      routeSubscription
    ];
  }

  resetPassword(){
    this.tierritasService.resetPassword(this.password).subscribe(response => {
      console.log(response);
    });
  }

  onRouteChanged(map: ParamMap) {
    this.password.token = map.get('token');
    this.tierritasService.validateInviteToken(this.password.token).subscribe(response => {
        if (response === 'invalid') {
           this.route.navigateByUrl('login');
        }
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
