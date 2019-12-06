import { AuthService } from './../../_services/auth.service';
import { TierritasService } from './../../_services/tierritas.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  currentRoute: string;

  constructor(public activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private tierritasService: TierritasService,
              private route: Router) {
      this.currentRoute = this.route.url;
     }


  ngOnInit() {
    const routeSubscription = this.activatedRoute.paramMap.subscribe(map => {
      this.onRouteChanged(map);
    });

    this.subscriptions = [
      routeSubscription
    ];

    this.profile.contacts = [
      new Contact(),
      new Contact(),
      new Contact()
    ]
  }

  onRouteChanged(map: ParamMap) {
    this.profile.token = map.get('token');
    this.tierritasService.validateInviteToken(this.profile.token).subscribe(response => {
        if(response === 'valid'){
          const decodedToken = this.authService.getDecodedAccessToken(this.profile.token );
          this.profile.email = decodedToken['email'];
          //this.profile = newUser(this.profile.token, this.profile.email);
        }else {
          this.route.navigateByUrl('login')
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
  signUp() {
    this.loading = true;

    // Cleaning some data
    if (this.profile.health_insurance_type === 'ISSS') {
      this.profile.insurance_company = '';
      this.profile.insurance_policy = '';
    }

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

