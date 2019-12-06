import { AuthService } from './../../_services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TierritasService } from 'src/app/_services/tierritas.service';
import { Profile } from 'src/app/_models/user';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
  faArrowLeft = faArrowLeft;
  hidden = false;

  constructor(
    private tierritasService: TierritasService,
    private router: Router,
    private auth: AuthService) { }

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
    const currentProf = this.auth.getDecodedAccessToken(token);
    this.currentProfileId = currentProf.user_id;
    console.log(this.currentProfileId, members)
    this.isProfileAdmin = currentProf.isAdmin;
    this.currentProfile = members.filter((profile: Profile) => profile.id === this.currentProfileId)[0];
  }

  showProfile(profileId: number){
    this.router.navigateByUrl(`profile/${profileId}`);
  }

  editProfile(){
    this.router.navigateByUrl('edit-profile');
  }

  invite() {
    this.router.navigateByUrl('invite');
  }
}
