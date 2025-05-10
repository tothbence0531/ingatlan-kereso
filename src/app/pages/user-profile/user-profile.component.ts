import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { MaterialModule } from '../../modules/material.module';
import { Router, RouterLink } from '@angular/router';
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
import { RoleTranslatePipe } from '../../pipes/role-translate.pipe';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-user-profile',
  imports: [
    NavbarComponent,
    PropertyCardComponent,
    MaterialModule,
    RouterLink,
    AppointmentCardComponent,
    RoleTranslatePipe,
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
  appointments: Observable<Appointment[]> = of([]);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private appointmentService: AppointmentService
  ) {
    this.currentUser = authService.getCurrentUser();
    this.currentUserData$ = this.authService.getCurrentUserData$();
    this.appointments =
      this.appointmentService.getAppointmentsFromCurrentUser();

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

    this.updateProfileForm.get('email')?.disable();
  }

  async updateProfile() {
    try {
      const updateUserData = {
        name: {
          first: this.updateProfileForm.value.firstName,
          last: this.updateProfileForm.value.lastName,
        },
        role: this.updateProfileForm.value.role,
      };

      await this.authService.updateUser(updateUserData).then(() => {
        this.updateProfileForm.reset();
        window.location.reload();
      });
    } catch (error) {
      console.error('Error in updateProfile:', error);
    }
  }

  deleteUser() {
    this.authService.deleteUser().then(() => {
      this.router.navigateByUrl('/');
    });
  }
}
