import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { faSignOutAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() currentRoute: string;
  backedRoutes = ['invite', 'profile', 'profile-edit', 'forgot-password'];
  sessionActive = ['invite', 'members', 'profile', 'profile-edit'];
  sessionVisible = false;
  backVisible = false;

  faSignOutAlt = faSignOutAlt;
  faArrowLeft = faArrowLeft;

  constructor(private authService: AuthService,  private location: Location) { }

  ngOnInit() {
    const current = this.currentRoute.split('/')[1];
    this.backVisible = this.backedRoutes.includes(current) ? true : false;
    this.sessionVisible = this.sessionActive.includes(current) ? true : false;
  }

  logout(){
    this.authService.logout();
  }

  backClicked() {
    this.location.back();
  }
}
