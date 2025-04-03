import { Component, inject, model } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-dialog',
  imports: [MaterialModule],
  templateUrl: './appointment-dialog.component.html',
  styleUrl: './appointment-dialog.component.scss',
})
export class AppointmentDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AppointmentDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
