import { AuthService } from './../../_services/auth.service';
import { TierritasService } from './../../_services/tierritas.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Profile } from 'src/app/_models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  profile: Profile;
  faEdit = faEdit;
  hidden = false;
  public loading = false;
  currentProfileId: any;
  profileId: string;
  currentRoute: string;

  constructor(public activatedRoute: ActivatedRoute,
              private tierritasService: TierritasService,
              private auth: AuthService,
              private router: Router) {
                this.currentRoute = this.router.url;
              }

  ngOnInit() {
    const routeSubscription = this.activatedRoute.paramMap.subscribe(map => {
      this.onRouteChanged(map);
    });

    this.subscriptions = [
      routeSubscription
    ];
  }

  onRouteChanged(map: ParamMap) {
    this.loading = true;
    this.profileId = map.get('profileId');
    this.tierritasService.getProfile(this.profileId).subscribe(profile => {
      this.profile = profile;
      this.getCurrentProfileId();
      this.loading = false;
    });
  }

  profileEdit() {
      this.router.navigateByUrl('profile-edit');
  }

  getCurrentProfileId() {
    const token = this.auth.getJwtToken();
    if (token) {
      const currentProf = this.auth.getDecodedAccessToken(token);
      this.currentProfileId = currentProf.user_id;
    }
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }
}
