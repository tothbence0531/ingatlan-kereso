import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OpacityOnHoverDirective } from '../../directives/opacity-on-hover.directive';
import { MaterialModule } from '../../modules/material.module';
import { AuthService } from '../../services/auth.service';
import { first, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-appointment-card',
  imports: [
    DatePipe,
    NgClass,
    RouterLink,
    OpacityOnHoverDirective,
    MaterialModule,
  ],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss',
})
export class AppointmentCardComponent {
  @Input() appointment!: Appointment;
  @Output() onAppointmentDeleted = new EventEmitter<Appointment>();
  type: 'to-attend' | 'owned' = 'to-attend';

  constructor(private authService: AuthService) {
    this.authService.getCurrentUserData$().subscribe((user) => {
      if (user && user.listings) {
        this.type = user.listings.includes(this.appointment.propertyId)
          ? 'owned'
          : 'to-attend';
      } else {
        this.type = 'to-attend';
      }
    });
  }

  deleteAppointment() {
    this.onAppointmentDeleted.emit(this.appointment);
  }
}
