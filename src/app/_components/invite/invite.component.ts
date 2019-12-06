import { Router } from '@angular/router';
import { TierritasService } from 'src/app/_services/tierritas.service';
import { Invite } from './../../_models/user';
import { Component, OnInit } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {
  public loading = false;
  faPlus = faPlus;
  faMinus = faMinus;
  hidden = false;
  invites: Array<Invite> = [];
  currentRoute: any;

  constructor(private tierritasService: TierritasService, private route: Router) {
    this.currentRoute = this.route.url;
  }

  ngOnInit() {
    this.addNewInvite();
  }

  addNewInvite(){
    this.invites.push(new Invite());
  }

  removeInvite(index) {
    this.invites.splice(index, 1);
  }

  sendInvites() {
    this.invites.forEach( (invite: Invite) => {
        this.tierritasService.sendInvite(invite).subscribe();
    });
  }

}
