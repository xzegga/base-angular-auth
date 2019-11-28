import { TierritasService } from './../../_services/tierritas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Profile } from 'src/app/_models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  subscriptions: Array<Subscription> = [];
  profile: Profile;
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
}
