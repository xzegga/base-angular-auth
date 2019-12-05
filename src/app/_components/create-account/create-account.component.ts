import { AuthService } from './../../_services/auth.service';
import { TierritasService } from './../../_services/tierritas.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Profile, Contact, newUser} from 'src/app/_models/user';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  public loading = false;
  subscriptions: Array<Subscription> = [];
  profile: Profile = new Profile();

  constructor(public activatedRoute: ActivatedRoute, private authService: AuthService, private tierritasService: TierritasService) { }


  ngOnInit() {
    const routeSubscription = this.activatedRoute.paramMap.subscribe(map => {
      this.onRouteChanged(map);
    });

    this.subscriptions = [
      routeSubscription
    ];

    /*this.profile.contacts = [
      new Contact(),
      new Contact(),
      new Contact()
    ]*/
  }

  onRouteChanged(map: ParamMap) {
    this.profile.token = map.get('token');
    const decodedToken = this.authService.getDecodedAccessToken(this.profile.token );
    this.profile.email = decodedToken['email'];
    this.profile = newUser(this.profile.token, this.profile.email);
    console.log(this.profile);
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }
  signUp() {
    this.loading = true;
    this.tierritasService.signUpMember(this.profile).subscribe(response => {
      if (response.status === 'success') {
        this.loading = false;
        this.authService.setUser(response);
      }
    }, error => {
      console.error(error);
      this.loading = false;
    });
  }

}

