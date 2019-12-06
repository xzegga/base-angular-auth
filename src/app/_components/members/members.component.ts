import { AuthService } from './../../_services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TierritasService } from 'src/app/_services/tierritas.service';
import { Profile } from 'src/app/_models/user';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  members: Profile[];
  public loading = false;
  currentProfile: Profile;
  currentProfileId: number;
  filterString = '';
  isProfileAdmin = false;
  hidden = false;
  faEdit = faEdit;
  currentRoute: string;

  constructor(
    private tierritasService: TierritasService,
    private router: Router,
    private auth: AuthService) {
      this.currentRoute = this.router.url;
      console.log(this.currentRoute)
    }

  ngOnInit() {
    this.getMembers();
  }

  getMembers(){
    this.loading = true;
    this.tierritasService.getMembers()
    .subscribe((members: Profile[]) => {
      this.members = members;
      this.getCurrentProfileId(members);
      this.loading = false;
    });
  }

  getCurrentProfileId(members: Profile[]) {
    const token = this.auth.getJwtToken();
    if (token) {
      const currentProf = this.auth.getDecodedAccessToken(token);
      this.currentProfileId = currentProf.user_id;
      this.isProfileAdmin = currentProf.isAdmin;
      this.currentProfile = members.filter((profile: Profile) => profile.id === this.currentProfileId)[0];
    }
  }

  showProfile(profileId: number){
    this.router.navigateByUrl(`profile/${profileId}`);
  }

  profileEdit(){
    this.router.navigateByUrl('profile-edit');
  }

  invite() {
    this.router.navigateByUrl('invite');
  }
}
