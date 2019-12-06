import { TierritasService } from 'src/app/_services/tierritas.service';
import { Invite } from './../../_models/user';
import { Component, OnInit } from '@angular/core';
import { faPlus, faMinus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {
  public loading = false;
  faPlus = faPlus;
  faMinus = faMinus;
  faArrowLeft = faArrowLeft;
  hidden = false;
  invites: Array<Invite> = [];

  constructor(private tierritasService: TierritasService) { }

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
