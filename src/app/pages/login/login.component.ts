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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = signal(true);
  snackBarRef = inject(MatSnackBar);
  @Input() durationInSeconds = 5;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.openErrorSnackbar('A beviteli adatok érvénytelenek!');
      return;
    }
    const user = this.loginForm.value;
    this.authService
      .login({ email: user.email, password: user.password })
      .subscribe({
        next: () => {
          this.router.navigateByUrl(
            this.route.snapshot.queryParams['returnUrl'] || '/'
          );
        },
        error: (err) => {
          this.openErrorSnackbar(err.message || 'Bejelentkezés sikertelen');
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
