import { AuthService } from './../../_services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TierritasService } from 'src/app/_services/tierritas.service';
import { Profile } from 'src/app/_models/user';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnDestroy {
  members: Profile[];
  public loading: boolean;
  subscriptions: Array<Subscription> = [];

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
    private authService: AuthService,
    private toastr: ToastrService) {
      this.currentRoute = this.router.url;
    }

  ngOnInit() {
    const loadingSubscription = this.authService.loading$.subscribe((loading: boolean) => this.loading = loading);
    this.subscriptions = [
      loadingSubscription
    ];

    this.getMembers();

  }

  getMembers(){
    this.authService.setLoading(true);
    this.tierritasService.getMembers()
    .subscribe((members: Profile[]) => {
      members.forEach(member => {
        const tempImage = member.image;
        member.image = './assets/avatar.png';
        this.tierritasService.getProfileImage(tempImage || null).subscribe(res => {
          member.image = this.tierritasService.convertToUrl(res);
        });
      });
      this.members = members;
      this.getCurrentProfileId(members);
      this.authService.setLoading(false);
    });
  }

  getCurrentProfileId(members: Profile[]) {
    const token = this.authService.getJwtToken();
    if (token) {
      const currentProf = this.authService.getDecodedAccessToken(token);
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

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }

}
