import { Component, Inject, inject } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-snackbar',
  imports: [MaterialModule],
  templateUrl: './error-snackbar.component.html',
  styleUrl: './error-snackbar.component.scss',
})
export class ErrorSnackbarComponent {
  snackBarRef = inject(MatSnackBar);
  bodyText = 'Hiba történt';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public message: string) {
    this.bodyText = message;
  }
}
