import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MaterialModule } from '../../modules/material.module';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { TruncatedTextComponent } from '../../components/truncated-text/truncated-text.component';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { Auth, authState, User } from '@angular/fire/auth';
import { map, Observable, Subscription } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AppointmentService } from '../../services/appointment.service';
import { Lightbox, IAlbum, LightboxEvent, LIGHTBOX_EVENT } from 'ngx-lightbox';
import { LightboxModule } from 'ngx-lightbox';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-property-details',
  imports: [
    NavbarComponent,
    FooterComponent,
    MaterialModule,
    DatePipe,
    TruncatedTextComponent,
    CurrencyPipe,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    AsyncPipe,
    LightboxModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss',
})
export class PropertyDetailsComponent implements OnInit {
  property!: Property;
  dateFormGroup: FormGroup;
  timeFormGroup: FormGroup;
  currentUser: Observable<User | null>;
  stepperOrientation: Observable<StepperOrientation>;
  private _album: IAlbum[] = [];
  lightboxOpened = false;
  resizeTimeout: any;
  private lightboxSubscription?: Subscription;
  currentLightboxImageIndex = 0;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private router: Router,
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private breakpointObserver: BreakpointObserver,
    private lightbox: Lightbox,
    private lightboxEvent: LightboxEvent,
    private auth: Auth
  ) {
    this.dateFormGroup = this.fb.group({
      date: ['', Validators.required],
    });

    this.timeFormGroup = this.fb.group({
      time: ['', Validators.required],
    });

    this.currentUser = authState(this.auth);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 530px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (!propertyId) {
      this.router.navigate(['/not-found']);
      return;
    }
    this.propertyService
      .getPropertyById(parseInt(propertyId))
      .subscribe((property) => {
        if (property) {
          this.property = property;
          this.initAlbum();
        } else {
          this.router.navigate(['/not-found']);
        }
      });
  }

  closeModal(): void {
    const modal = document.querySelector('.modal');
    modal?.classList.add('hidden');
  }

  openModal(): void {
    if (this.authService.isAuthenticated()) {
      const modal = document.querySelector('.modal');
      modal?.classList.remove('hidden');
    } else {
      this.router.navigate(['/login']);
    }
  }

  getDateTime(): { date: Date; time: string } | null {
    if (this.dateFormGroup.valid && this.timeFormGroup.valid) {
      const dateValue = this.dateFormGroup.get('date')?.value;
      const timeValue = this.timeFormGroup.get('time')?.value;

      return {
        date: new Date(dateValue),
        time: timeValue,
      };
    }
    return null;
  }

  submitAppointment() {
    if (
      this.dateFormGroup.valid &&
      this.timeFormGroup.valid &&
      this.authService.isAuthenticated() &&
      this.currentUser
    ) {
      const dateValue = this.dateFormGroup.get('date')?.value;
      const timeValue = this.timeFormGroup.get('time')?.value;

      if (!dateValue || !timeValue) {
        console.log('Hiányzó dátum vagy idő érték');
        return;
      }

      const date = new Date(dateValue);

      let hours: number, minutes: number;

      if (typeof timeValue === 'string') {
        const [h, m] = timeValue.split(':');
        hours = parseInt(h, 10);
        minutes = parseInt(m, 10);
      } else if (timeValue instanceof Date) {
        hours = timeValue.getHours();
        minutes = timeValue.getMinutes();
      } else {
        console.error('Ismeretlen idő formátum:', timeValue);
        return;
      }

      date.setHours(hours);
      date.setMinutes(minutes);

      this.appointmentService.addAppointment({
        userId: 'placeholder', // TODO: fix this
        propertyId: this.property.id,
        date: date,
      });

      const modal = document.querySelector('.modal');
      modal?.classList.add('hidden');
    } else {
      console.log('A érvénytelen időpontfoglalás');
    }
  }

  initAlbum() {
    this._album = [];
    for (let i = 0; i < this.property.images.length; i++) {
      this._album.push({
        src: `/assets/property-images/${this.property.images[i]}`,
        thumb: `/assets/property-images/${this.property.images[i]}`,
      });
    }
  }

  openLightbox(index: number) {
    this.currentLightboxImageIndex = index;
    this.lightboxSubscription = this.lightboxEvent.lightboxEvent$.subscribe(
      (event: any) => {
        if (event.id === LIGHTBOX_EVENT.CLOSE) {
          //console.log('closed');
          this.lightboxOpened = false;
          this.lightboxSubscription?.unsubscribe();
        }
        if (event.id === LIGHTBOX_EVENT.CHANGE_PAGE) {
          //console.log(event.data);
          this.currentLightboxImageIndex = event.data;
        }

        if (event.id === LIGHTBOX_EVENT.OPEN) {
          //console.log('opened');
          this.lightboxOpened = true;
        }
      }
    );
    this.lightbox.open(this._album, this.currentLightboxImageIndex, {
      resizeDuration: 0.4,
      fadeDuration: 0.3,
      showImageNumberLabel: true,
      disableScrolling: true,
      centerVertically: true,
      albumLabel: '%1. kép a(z) %2-ből',
      showDownloadButton: true,
    });
    this.lightboxOpened = true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    //console.log(this.lightboxOpened);
    if (this.lightboxOpened) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.reloadLightbox();
      }, 100);
    }
  }

  private reloadLightbox() {
    //console.log('before: ', this.lightboxOpened);
    this.lightbox.close();
    this.openLightbox(this.currentLightboxImageIndex);
    //console.log('after: ', this.lightboxOpened);
  }
}
