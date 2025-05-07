import { Component, OnInit } from '@angular/core';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MaterialModule } from '../../modules/material.module';
import { Property } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';
import { map, Observable } from 'rxjs';
import { DetailedSearchbarComponent } from '../../components/detailed-searchbar/detailed-searchbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SearchCriteria } from '../../models/search.model';
import { PageEvent } from '@angular/material/paginator';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-property-list',
  imports: [
    PropertyCardComponent,
    MaterialModule,
    NavbarComponent,
    DetailedSearchbarComponent,
    FooterComponent,
    AsyncPipe,
  ],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent implements OnInit {
  properties$: Observable<Property[]>;
  filteredProperties!: Observable<Property[]>;
  paginatedProperties!: Observable<Property[]>;
  pageSize = 8;
  pageIndex = 0;

  constructor(private propertyService: PropertyService) {
    this.properties$ = this.propertyService.properties$;
  }

  onInputChanged(criteria: SearchCriteria) {
    this.filteredProperties = this.propertyService.filterProperties(criteria);
    this.pageIndex = 0;
    this.updatePaginatedProperties();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.updatePaginatedProperties();
  }

  updatePaginatedProperties() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProperties = this.filteredProperties.pipe(
      map((properties) => properties.slice(start, end))
    );
  }

  ngOnInit() {
    this.filteredProperties = this.propertyService.filterProperties({});
    this.paginatedProperties = this.propertyService.paginateProperties(
      this.pageIndex,
      this.pageSize
    );
  }
}
