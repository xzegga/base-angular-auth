import { AuthService } from './../../_services/auth.service';
import { Router } from '@angular/router';
import { TierritasService } from 'src/app/_services/tierritas.service';
import { Invite } from './../../_models/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit, OnDestroy {
  public loading: boolean;
  subscriptions: Array<Subscription> = [];

  faPlus = faPlus;
  faMinus = faMinus;
  hidden = false;
  invites: Array<Invite> = [];
  currentRoute: any;

  constructor(private tierritasService: TierritasService,
              private route: Router,
              private authService: AuthService,
              private toastr: ToastrService) {
    this.currentRoute = this.route.url;
  }

  ngOnInit() {
    this.addNewInvite();

    const loadingSubscription = this.authService.loading$.subscribe((loading: boolean) => this.loading = loading);
    this.subscriptions = [
      loadingSubscription
    ];
  }

  addNewInvite(){
    this.invites.push(new Invite());
  }

  removeInvite(index) {
    this.invites.splice(index, 1);
  }

  sendInvites() {
    this.authService.setLoading(true);
    this.invites.forEach( (invite: Invite) => {
        this.tierritasService.sendInvite(invite).subscribe(response => {
          this.authService.setLoading(false);
          this.toastr.success('Listo!, se ha enviado un correo electrónico a tus invitados');
        });
    });
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }
}
