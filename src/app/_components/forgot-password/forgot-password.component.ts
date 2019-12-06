import { Component, OnInit } from '@angular/core';
import { TierritasService } from 'src/app/_services/tierritas.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public loading = false;
  email = '';
  faArrowLeft = faArrowLeft;
  hidden = false;

  constructor(private tierritasService: TierritasService) { }

  ngOnInit() {
  }

  sendRequest(){
    this.tierritasService.forgotPassword(this.email).subscribe(response => {
      // do something
    });
  }

}
