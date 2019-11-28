import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  faSignOutAlt = faSignOutAlt;
  hidden = false;

  constructor(private authService: AuthService, private route:ActivatedRoute){

  }
  
  ngOnInit(): void {
      
  }
  
  
  logout(){
    this.authService.logout();
  }
}
