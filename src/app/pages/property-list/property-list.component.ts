import { Component, OnInit } from '@angular/core';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MaterialModule } from '../../modules/material.module';
import { Property } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';
import { Observable } from 'rxjs';
import { DetailedSearchbarComponent } from '../../components/detailed-searchbar/detailed-searchbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SearchCriteria } from '../../models/search.model';

@Component({
  selector: 'app-property-list',
  imports: [
    PropertyCardComponent,
    MaterialModule,
    NavbarComponent,
    DetailedSearchbarComponent,
    FooterComponent,
  ],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent implements OnInit {
  properties$: Observable<Property[]>;
  filteredProperties!: Property[];

  constructor(private propertyService: PropertyService) {
    this.properties$ = this.propertyService.properties$;
  }

  onInputChanged(criteria: SearchCriteria) {
    this.filteredProperties = this.propertyService.filterProperties(criteria);
    console.log(criteria);
  }

  ngOnInit() {
    this.filteredProperties = this.propertyService.filterProperties({});
  }
}
