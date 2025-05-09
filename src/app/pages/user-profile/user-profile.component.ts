import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { MaterialModule } from '../../modules/material.module';
import { RouterLink } from '@angular/router';
import { AppointmentCardComponent } from '../../components/appointment-card/appointment-card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Firestore } from '@angular/fire/firestore';
import { first, map, Observable, of } from 'rxjs';
import { AppUser } from '../../models/user.model';
import { User } from 'firebase/auth';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [
    NavbarComponent,
    PropertyCardComponent,
    MaterialModule,
    RouterLink,
    AppointmentCardComponent,
    FooterComponent,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  updateProfileForm: FormGroup;
  currentUser: Observable<User | null> = of(null);
  currentUserData$: Observable<AppUser | null> = of(null);

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.currentUser = authService.getCurrentUser();
    this.currentUserData$ = this.authService.getCurrentUserData$();

    this.updateProfileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
    });

    this.currentUserData$.pipe(first()).subscribe((user) => {
      if (user) {
        this.updateProfileForm.patchValue({
          firstName: user.name?.first || '',
          lastName: user.name?.last || '',
          email: user.email || '',
          role: user.role || '',
        });
      }
    });
  }
}
