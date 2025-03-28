import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MaterialModule } from '../../modules/material.module';
import { RouterLink } from '@angular/router';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { PropertyService } from '../../services/property.service';
import { Observable } from 'rxjs';
import { Property } from '../../models/property.model';
import { AsyncPipe, NgFor } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { DetailedSearchbarComponent } from '../../components/detailed-searchbar/detailed-searchbar.component';

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
  constructor(private propertyService: PropertyService) {
    this.properties$ = this.propertyService.properties$;
    //console.log(this.properties$);
  }
}
