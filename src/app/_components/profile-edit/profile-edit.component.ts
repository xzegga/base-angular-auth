import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TierritasService } from 'src/app/_services/tierritas.service';
import { Profile, Contact } from 'src/app/_models/user';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  public loading = false;
  profile: Profile = new Profile();
  currentId: string;
  faPlus = faPlus;
  currentProfileId: any;
  dateValue: Date;
  public maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  currentRoute: string;

  constructor(public activatedRoute: ActivatedRoute,
              private tierritasService: TierritasService,
              private route: Router,
              private auth: AuthService) {
                this.currentRoute = this.route.url;
               }


  ngOnInit() {
    this.getCurrentProfileId();

  }

  getCurrentProfileId() {
    const token = this.auth.getJwtToken();
    const currentProf = this.auth.getDecodedAccessToken(token);
    this.currentProfileId = currentProf.user_id;

    this.tierritasService.getProfile(this.currentProfileId).subscribe(profile => {
      this.profile = profile;
      this.dateValue = new Date (this.profile.birthdate);
      if (this.profile.hasOwnProperty('contacts')) {
        if (this.profile.contacts.length === 0) {
          this.profile.contacts = [];
        }
      } else {
        this.profile.contacts = [];
      }
    });
  }

  editUser() {
    if (this.profile.health_insurance_type === 'ISSS') {
      this.profile.insurance_company = '';
      this.profile.insurance_policy = '';
    }
  }

  addNewContact() {
    if (this.profile.contacts.length < 3) {
      this.profile.contacts.push(new Contact());
    }
  }

}
