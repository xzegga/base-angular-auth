import { TierritasService } from './../../_services/tierritas.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
  faArrowLeft = faArrowLeft;
  hidden = false;
  public loading = false;

  constructor(public activatedRoute: ActivatedRoute, private tierritasService: TierritasService) { }

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
    const profileId = map.get('profileId');
    this.tierritasService.getProfile(profileId).subscribe(profile => {
      this.profile = profile;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }
}
