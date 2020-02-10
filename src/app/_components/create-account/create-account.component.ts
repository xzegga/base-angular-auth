import { AuthService } from './../../_services/auth.service';
import { TierritasService } from './../../_services/tierritas.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Profile, Contact, BLOODTYPE} from 'src/app/_models/user';
import { ToastrService } from 'ngx-toastr';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  public loading: boolean;
  subscriptions: Array<Subscription> = [];
  maxDate = new Date();
  profile: Profile = new Profile();
  currentRoute: string;
  passwordPattern =  new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g);
  birthdate = null;
  bloodtype = BLOODTYPE;

  @ViewChild('form', {static: false}) form: any;
  @ViewChild('ejDate', {static: false}) ejDate: DatePickerComponent;
  public formObject: FormValidator;

  constructor(public activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private tierritasService: TierritasService,
              private route: Router,
              private toastr: ToastrService) {
      this.currentRoute = this.route.url;
     }


  ngOnInit() {
    const routeSubscription = this.activatedRoute.paramMap.subscribe(map => {
      this.onRouteChanged(map);
    });

    const loadingSubscription = this.authService.loading$.subscribe((loading: boolean) => this.loading = loading);

    this.subscriptions = [
      routeSubscription,
      loadingSubscription
    ];

    this.profile.contacts = [
      new Contact(),
      new Contact(),
      new Contact()
    ]

    let customFn: (args: {
      [key: string]: string
    }) => boolean = (args: {
        [key: string]: string
    }) => {
        return this.ejDate.value !== null;
    };
    let options: FormValidatorModel = {
        rules: {
            'datepicker': {
                required: [true, "La fecha es requerida"]
            }
        },
        customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
            // inputElement.parentElement.parentElement.appendChild(errorElement);
        }
    };
    this.formObject = new FormValidator('#form-element', options);

    this.formObject.addRules('datepicker', {
        range: [customFn, "Selecciona una fecha en formato valido (dd-mm-yyyy)"]
    });
  }

  onRouteChanged(map: ParamMap) {
    this.profile.token = map.get('token');
    this.tierritasService.validateInviteToken(this.profile.token).subscribe(response => {
        if(response === 'valid'){
          const decodedToken = this.authService.getDecodedAccessToken(this.profile.token );
          this.profile.email = decodedToken.email;
        } else {
          this.route.navigateByUrl('login');
        }
      }
    )
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }

  signUp() {
    this.authService.setLoading(true);
    // Cleaning some data
    if (this.profile.health_insurance_type === 'ISSS') {
      this.profile.insurance_company = '';
      this.profile.insurance_policy = '';
    }
    const birdthdate = new Date(this.profile.birthdate);
    this.profile.birthdate = birdthdate.getDate() + '-' + (birdthdate.getMonth() + 1) + '-' + birdthdate.getFullYear();
    
    this.tierritasService.signUpMember(this.profile).subscribe(
      response => {
        if (response) {
          this.authService.setLoading(false);
          this.authService.setUser(response);
          this.toastr.success('Ya eres parte de Tierritas Moto Club El Salvador', '¡Enhorabuena!');
          this.route.navigateByUrl('login');
        }
      }
    );
  }

  addNewContact() {
    if (this.profile.contacts.length < 3) {
      this.profile.contacts.push(new Contact());
    }
  }

  public onFocusOut(): void {
    console.log(this.form.valid)
    this.formObject.validate("datepicker");
  }

  // Custom validation takes place when value is changed.
  public onChange(args: any) {
      if (this.ejDate.value !== null)
          this.formObject.validate("datepicker");
  }
}

