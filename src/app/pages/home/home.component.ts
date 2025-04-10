import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MaterialModule } from '../../modules/material.module';
import { Router, RouterLink } from '@angular/router';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { PropertyService } from '../../services/property.service';
import { Observable } from 'rxjs';
import { Property } from '../../models/property.model';
import { AsyncPipe, NgStyle } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    SearchBarComponent,
    MaterialModule,
    RouterLink,
    PropertyCardComponent,
    AsyncPipe,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  properties$: Observable<Property[]>;
  authService = inject(AuthService);
  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {
    this.properties$ = this.propertyService.properties$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
