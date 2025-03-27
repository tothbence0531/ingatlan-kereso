import { Component } from '@angular/core';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MaterialModule } from '../../modules/material.module';
import { Property } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-property-list',
  imports: [
    PropertyCardComponent,
    RouterLink,
    MaterialModule,
    NavbarComponent,
    AsyncPipe,
    NgFor,
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
