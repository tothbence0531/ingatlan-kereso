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
import { User } from '../../models/user.model';
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

  onSubmit() {
    if (this.registerForm.invalid) {
      this.openErrorSnackbar('A beviteli adatok érvénytelenek!');
      return;
    } else if (
      this.registerForm.value.password !== this.registerForm.value.rePassword
    ) {
      this.openErrorSnackbar('A jelszavak nem egyeznek!');
      return;
    }

    const user: User = {
      id: this.authService.generateId(),
      name:
        this.registerForm.value.firstName +
        ' ' +
        this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      role: this.registerForm.value.role,
      password_hashed: this.registerForm.value.password,
    };
    this.authService.register(user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.openErrorSnackbar(err.message || 'Regisztráció sikertelen');
      },
    });
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
