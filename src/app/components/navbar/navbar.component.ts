import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../modules/material.module';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule, RouterLink, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  themeService = inject(ThemeService);

  logout() {
    this.authService.logout();
  }
}
