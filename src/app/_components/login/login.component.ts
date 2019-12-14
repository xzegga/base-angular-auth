import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loading: boolean;
  subscriptions: Array<Subscription> = [];

  model: any = {};
  currentRoute: string;

  constructor(
    private authService: AuthService,
    private route: Router,
    private toastr: ToastrService
  ) {
    this.currentRoute = this.route.url;
  }

  ngOnInit() {
    const loadingSubscription = this.authService.loading$.subscribe((loading: boolean) => {
      this.loading = loading;
    });
    this.subscriptions = [
      loadingSubscription
    ];
  }

  login() {
    this.authService.setLoading(true);
    this.authService.loginForm(this.model).subscribe(
      response => {
            this.authService.setLoading(false);
            this.authService.setUser(response);
    });
  }

  forgotPass(){
    this.route.navigateByUrl('forgot-password');
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }
}
