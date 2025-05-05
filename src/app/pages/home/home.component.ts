import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MaterialModule } from '../../modules/material.module';
import { Router, RouterLink } from '@angular/router';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { PropertyService } from '../../services/property.service';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { Property } from '../../models/property.model';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { NgStyle } from '@angular/common';
import { AppUser } from '../../models/user.model';

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
    NgStyle,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  properties$: Observable<Property[]>;
  authService = inject(AuthService);
  currentUser: AppUser | null = null;
  constructor(private propertyService: PropertyService) {
    this.properties$ = this.propertyService.properties$;
  }

  ngOnInit() {
    this.authService
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
}
