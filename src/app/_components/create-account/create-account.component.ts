import { AuthService } from './../../_services/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Profile } from 'src/app/_models/user';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  public loading = false;
  subscriptions: Array<Subscription> = [];
  profile: Profile = new Profile();

  constructor(public activatedRoute: ActivatedRoute, private authService: AuthService) { }


  ngOnInit() {
    const routeSubscription = this.activatedRoute.paramMap.subscribe(map => {
      this.onRouteChanged(map);
    });

    this.subscriptions = [
      routeSubscription
    ];
  }

  onRouteChanged(map: ParamMap) {
    const token = map.get('token');
    const decodedToken = this.authService.getDecodedAccessToken(token);
    this.profile.email = decodedToken.email;
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }

}
