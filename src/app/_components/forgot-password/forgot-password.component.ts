import { AuthService } from './../../_services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TierritasService } from 'src/app/_services/tierritas.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  public loading: boolean;
  subscriptions: Array<Subscription> = [];

  email = '';
  hidden = false;
  currentRoute: any;

  constructor(
    private tierritasService: TierritasService,
    private route: Router,
    private authService: AuthService,
    private toastr: ToastrService) {
      this.currentRoute = this.route.url;
  }

  ngOnInit() {
    const loadingSubscription = this.authService.loading$.subscribe((loading: boolean) => this.loading = loading);
    this.subscriptions = [
      loadingSubscription
    ];
  }

  sendRequest(){
    this.authService.setLoading(true);
    this.tierritasService.forgotPassword(this.email).subscribe(response => {
      this.authService.setLoading(false);
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
