import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../modules/material.module';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { AsyncPipe } from '@angular/common';
import { catchError, of, Subscription, tap } from 'rxjs';
import { AppUser } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule, RouterLink, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  router = inject(Router);
  themeService = inject(ThemeService);
  currentUser: AppUser | null = null;
  userSubscription: Subscription | null = null;

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.userSubscription = this.authService
      .getCurrentUserData$()
      .pipe(
        tap((user) => (this.currentUser = user)),
        catchError((error) => {
          console.error('Error:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
