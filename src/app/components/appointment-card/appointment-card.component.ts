import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OpacityOnHoverDirective } from '../../directives/opacity-on-hover.directive';
import { MaterialModule } from '../../modules/material.module';

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
  type: 'to-attend' | 'owned';

  constructor() {
    this.type = Math.random() > 0.5 ? 'to-attend' : 'owned';
  }

  deleteAppointment() {
    this.onAppointmentDeleted.emit(this.appointment);
  }
}
