import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
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
import { Subscription } from 'rxjs';

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
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  hide = signal(true);
  snackBarRef = inject(MatSnackBar);
  @Input() durationInSeconds = 5;
  authSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.openErrorSnackbar('Érvénytelen adatok');
    } else {
      const user = this.loginForm.value;
      this.authService
        .login(user.email, user.password)
        .then((userCredential) => {
          //console.log('login success');
          this.router.navigateByUrl('/');
        })
        .catch((error) => {
          //console.error('Login error:', error);

          if (error.code) {
            switch (error.code) {
              case 'auth/user-not-found':
                this.openErrorSnackbar(
                  'Felhasználó nem található a megadott e-mail címmel'
                );
                break;
              case 'auth/wrong-password':
                this.openErrorSnackbar('Hibás jelszó');
                break;
              case 'auth/invalid-credential':
                this.openErrorSnackbar('Hibás felhasználónév vagy jelszó');
                break;
              case 'auth/too-many-requests':
                this.openErrorSnackbar(
                  'Túl sokszor próbált bejelentkezni, próbálja meg később'
                );
                break;
              case 'auth/invalid-email':
                this.openErrorSnackbar('Érvénytelen e-mail cím formátum');
                break;
              default:
                this.openErrorSnackbar(`Hiba történt: ${error.code}`);
                break;
            }
          } else {
            this.openErrorSnackbar('Hálózati hiba vagy szerver probléma');
          }
        });
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

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }
}
