import {
  Component,
  inject,
  model,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MaterialModule } from '../../modules/material.module';
import { CurrencyPipe, DatePipe } from '@angular/common';
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
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

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
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss',
})
export class PropertyDetailsComponent implements OnInit {
  property!: Property;
  dateFormGroup: FormGroup;
  timeFormGroup: FormGroup;
  currentUser: User | null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.dateFormGroup = this.fb.group({
      date: ['', Validators.required],
    });

    this.timeFormGroup = this.fb.group({
      time: ['', Validators.required],
    });

    this.currentUser = this.authService.currentUserSignal();
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
      this.authService.isAuthenticated()
    ) {
      const dateValue = this.dateFormGroup.get('date')?.value;
      const timeValue = this.timeFormGroup.get('time')?.value;

      if (!dateValue || !timeValue) {
        console.error('Hiányzó dátum vagy idő érték');
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

      //console.log('Egyesített dátum-idő:', date);
      //console.log('User: ', this.currentUser);
      const modal = document.querySelector('.modal');
      modal?.classList.add('hidden');
    } else {
      console.log('A érvénytelen időpontfoglalás');
    }
  }
}
