import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TierritasService } from 'src/app/_services/tierritas.service';
import { Profile } from 'src/app/_models/user';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  members: Profile[];
  public loading = false;

  constructor(private tierritasService: TierritasService, private router: Router) { }

  ngOnInit() {
    this.getMembers();
  }

  getMembers(){
    this.loading = true;
    this.tierritasService.getMembers()
    .subscribe((members: Profile[]) => {
      this.members = members;
      this.loading = false;
    });
  }

  showProfile(profileId: string){
    this.router.navigateByUrl(`profile/${profileId}`);
  }

  invite() {
    this.router.navigateByUrl('invite');
  }
}
