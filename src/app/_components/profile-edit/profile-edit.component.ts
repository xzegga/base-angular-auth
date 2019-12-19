import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TierritasService } from 'src/app/_services/tierritas.service';
import { Profile, Contact } from 'src/app/_models/user';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit, OnDestroy {

  public loading: boolean;
  subscriptions: Array<Subscription> = [];

  profile: Profile = new Profile();
  currentId: string;
  faPlus = faPlus;
  currentProfileId: any;
  dateValue: Date;
  public maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  currentRoute: string;
  selectedFile: File = null;
  imgSrc: any;

  constructor(public activatedRoute: ActivatedRoute,
              private tierritasService: TierritasService,
              private route: Router,
              private authService: AuthService,
              private toastr: ToastrService,
              private sanitizer: DomSanitizer) {
                this.currentRoute = this.route.url;
               }


  ngOnInit() {
    const loadingSubscription = this.authService.loading$.subscribe((loading: boolean) => this.loading = loading);
    this.subscriptions = [
      loadingSubscription
    ];

    this.getCurrentProfileId();
  }

  getCurrentProfileId() {
    const token = this.authService.getJwtToken();
    const currentProf = this.authService.getDecodedAccessToken(token);
    this.currentProfileId = currentProf.user_id;

    this.authService.setLoading(true);
    this.tierritasService.getProfile(this.currentProfileId).subscribe(profile => {
      this.profile = profile;
      this.dateValue = new Date (this.profile.birthdate);
      if (this.profile.hasOwnProperty('contacts')) {
        if (this.profile.contacts.length === 0) {
          this.profile.contacts = [];
        }
      } else {
        this.profile.contacts = [];
      }
      this.tierritasService.getProfileImage(profile.image).subscribe(res => {
        this.imgSrc = this.convertToUrl(res);
      });
      this.authService.setLoading(false);
    });
  }

  editUser() {
    if (this.profile.health_insurance_type === 'ISSS') {
      this.profile.insurance_company = '';
      this.profile.insurance_policy = '';
    }

    const birdthdate = new Date(this.profile.birthdate);
    this.profile.birthdate = birdthdate.getDate() + '-' + (birdthdate.getMonth() + 1) + '-' + birdthdate.getFullYear();

    this.authService.setLoading(true);
    this.tierritasService.saveMember(this.profile).subscribe(response => {
      this.authService.setLoading(false);
      this.toastr.success('Tus datos han sido actualizados con éxito', 'Enhorabuena');
    });
  }

  addNewContact() {
    if (this.profile.contacts.length < 3) {
      this.profile.contacts.push(new Contact());
    }
  }


  onFileSelected(event){
    this.selectedFile = event.target.files[0] as File;
    const fd = new FormData();
    this.authService.setLoading(true);
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.tierritasService.updateProfileImage(fd).subscribe(res => {
      this.authService.setLoading(false);
      this.toastr.success('Imagen actualizada exitosamente', 'Enhorabuena');
      this.imgSrc = this.convertToUrl(res);
    });
  }

  convertToUrl(blob: any) {
    const urlCreator = window.URL;
    return this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
  }
  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }


}
