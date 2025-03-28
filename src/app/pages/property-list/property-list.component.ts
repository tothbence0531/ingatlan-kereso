import { Component } from '@angular/core';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MaterialModule } from '../../modules/material.module';
import { Property } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { DetailedSearchbarComponent } from '../../components/detailed-searchbar/detailed-searchbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-property-list',
  imports: [
    PropertyCardComponent,
    MaterialModule,
    NavbarComponent,
    AsyncPipe,
    DetailedSearchbarComponent,
    FooterComponent,
  ],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent {
  properties$: Observable<Property[]>;

  constructor(private propertyService: PropertyService) {
    this.properties$ = this.propertyService.properties$;
  }
}
