import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
} from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from '../../components/error-snackbar/error-snackbar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  registerForm: FormGroup;
  hide = signal(true);
  snackBarRef = inject(MatSnackBar);
  @Input() durationInSeconds = 5;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, Validators.minLength(6)]],
      role: ['buyer', [Validators.required]],
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.openErrorSnackbar('Kérjük, töltse ki az összes mezőt helyesen!');
      return;
    }

    const { email, password, firstName, lastName, rePassword, role } =
      this.registerForm.value;

    if (password !== rePassword) {
      this.openErrorSnackbar('A jelszavak nem egyeznek');
      return;
    }

    try {
      await this.authService.register(
        email,
        password,
        firstName,
        lastName,
        role
      );
      this.router.navigateByUrl('/login');
    } catch (error: any) {
      let errorMessage = 'Ismeretlen hiba történt a regisztráció során';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Ez az email cím már használatban van';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Érvénytelen email cím';
          break;
        case 'auth/weak-password':
          errorMessage = 'A jelszó túl gyenge (legalább 6 karakter legyen)';
          break;
      }

      this.openErrorSnackbar(errorMessage);
    }
  }

  openErrorSnackbar(message: string) {
    this.snackBarRef.openFromComponent(ErrorSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      panelClass: 'error-snackbar',
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      data: message,
    });
  }
}
