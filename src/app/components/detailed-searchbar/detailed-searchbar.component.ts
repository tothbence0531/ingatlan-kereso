import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SearchCriteria } from '../../models/search.model';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';
import { startWith, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-detailed-searchbar',
  imports: [MaterialModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './detailed-searchbar.component.html',
  styleUrl: './detailed-searchbar.component.scss',
})
export class DetailedSearchbarComponent implements OnInit {
  detailedSearchForm: FormGroup;
  properties: Property[] = [];
  minPropertyPrice: number = 0;
  maxPropertyPrice: number = 0;
  typeFilterOptions!: Observable<string[]>;
  locationFilterOptions!: Observable<string[]>;
  filteredProperties!: Property[];

  @Output() onInputChanged = new EventEmitter<SearchCriteria>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {
    this.detailedSearchForm = this.fb.group({
      location: [''],
      type: [''],
      minPrice: [''],
      maxPrice: [''],
      bedrooms: [''],
    });
  }

  ngOnInit() {
    this.loadProperties();
    this.loadRouteQuery();
    this.loadFilterOptions();
    this.filterProperties();
  }

  filterProperties() {
    this.detailedSearchForm.valueChanges.subscribe((value) => {
      const criteria = value as SearchCriteria;
      this.onInputChanged.emit(criteria);
    });
  }

  async loadFilterOptions() {
    this.typeFilterOptions = this.detailedSearchForm
      .get('type')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._FILTER_TYPE(value || ''))
      );

    this.locationFilterOptions = this.detailedSearchForm
      .get('location')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._FILTER_LOCATION(value || ''))
      );
  }

  loadRouteQuery() {
    this.route.queryParams.subscribe((params) => {
      const searchCriteria: SearchCriteria = {
        location: params['location'] || '',
        type: params['type'] || '',
        minPrice: params['minPrice'] ? Number(params['minPrice']) : 0,
        maxPrice: params['maxPrice']
          ? Number(params['maxPrice']) * 1_000_000
          : this.maxPropertyPrice,
        bedrooms: params['bedrooms'] ? Number(params['bedrooms']) : null,
      };
      //console.log(searchCriteria);
      this.detailedSearchForm.patchValue(searchCriteria);
      this.onInputChanged.emit(searchCriteria);
    });
  }

  loadProperties() {
    this.propertyService.properties$.subscribe((properties) => {
      this.properties = properties;

      this.minPropertyPrice = this.properties.reduce(
        (min, property) => (property.price < min ? property.price : min),
        this.properties[0].price
      );

      this.maxPropertyPrice = this.properties.reduce(
        (max, property) => (property.price > max ? property.price : max),
        this.properties[0].price
      );
    });
  }

  formatPrice(value: number): string {
    if (value >= 1000000) {
      return `${parseFloat((value / 1000000).toFixed(2))}M`;
    } else if (value > 1000) {
      return `${parseFloat((value / 1000).toFixed(2))}K`;
    } else {
      return value.toString();
    }
  }

  _FILTER_TYPE(value: string): string[] {
    const filterValue = value.toLocaleLowerCase();
    const uniqueTypes = [
      ...new Set(this.properties.map((property) => property.type)),
    ];
    return uniqueTypes.filter((type) =>
      type.toLocaleLowerCase().includes(filterValue)
    );
  }

  _FILTER_LOCATION(value: string): string[] {
    const filterValue = value.toLocaleLowerCase();
    const uniqueLocations = [
      ...new Set(this.properties.map((property) => property.location)),
    ];
    return uniqueLocations.filter((location) =>
      location.toLocaleLowerCase().includes(filterValue)
    );
  }
}
