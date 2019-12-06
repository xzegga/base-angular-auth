import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TierritasService } from 'src/app/_services/tierritas.service';
import { Profile, Contact } from 'src/app/_models/user';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public loading = false;
  profile: Profile = new Profile();
  currentId: string;
  faPlus = faPlus;
  currentProfileId: any;

  constructor(public activatedRoute: ActivatedRoute,
              private tierritasService: TierritasService,
              private route: Router,
              private auth: AuthService) { }


  ngOnInit() {
    this.getCurrentProfileId();

  }

  getCurrentProfileId() {
    const token = this.auth.getJwtToken();
    const currentProf = this.auth.getDecodedAccessToken(token);
    this.currentProfileId = currentProf.user_id;

    this.tierritasService.getProfile(this.currentProfileId).subscribe(profile => {
      this.profile = profile;
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
    // do something
  }

  addNewContact() {
    if (this.profile.contacts.length < 3) {
      this.profile.contacts.push(new Contact());
    }
  }

}
