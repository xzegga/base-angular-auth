import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TierritasService } from 'src/app/_services/tierritas.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public loading = false;
  email = '';
  hidden = false;
  currentRoute: any;

  constructor(private tierritasService: TierritasService, private route: Router) {
    this.currentRoute = this.route.url;
  }

  ngOnInit() {
  }

  sendRequest(){
    this.tierritasService.forgotPassword(this.email).subscribe(response => {
      // do something
    });
  }

}
