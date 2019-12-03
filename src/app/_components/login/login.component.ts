import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loading = false;
  model: any = {};

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.loading = true;
    this.authService.loginForm(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.loading = false;
        this.authService.setUser(response);
      }
    }, error => {
      console.error(error);
      this.loading = false;
    });
  }

}
