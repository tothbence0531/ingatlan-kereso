import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointments: BehaviorSubject<Appointment[]> = new BehaviorSubject<
    Appointment[]
  >([]);

  appointments$ = this.appointments.asObservable();

  addAppointment(appointment: Appointment) {
    this.appointments.next([...this.appointments.value, appointment]);
  }

  constructor() {}
}
