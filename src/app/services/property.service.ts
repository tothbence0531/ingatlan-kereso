import { Injectable } from '@angular/core';
import { Property } from '../models/property.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SearchCriteria } from '../models/search.model';
import propertiesData from '../../../public/assets/data/properties.json';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private propertiesSubject$ = new BehaviorSubject<Property[]>([]);
  public properties$ = this.propertiesSubject$.asObservable();
  private minPrice = 0;
  private maxPrice = 0;

  constructor() {
    this.loadProperties();
  }

  private loadProperties() {
    const properties = propertiesData.map((property) => ({
      ...property,
      created_at: new Date(property.created_at),
    }));

    this.propertiesSubject$.next(properties);

    this.calculatePriceRange(properties);
  }

  private calculatePriceRange(properties: Property[]) {
    if (properties.length > 0) {
      const prices = properties.map((p) => p.price);
      this.minPrice = Math.min(...prices);
      this.maxPrice = Math.max(...prices);
    }
  }

  getMinPrice(): number {
    return this.minPrice;
  }

  getMaxPrice(): number {
    return this.maxPrice;
  }

  filterProperties(criteria: SearchCriteria): Property[] {
    return this.propertiesSubject$.value.filter((property) => {
      if (
        (!criteria.location ||
          (criteria.location &&
            property.location
              .toLowerCase()
              .includes(criteria.location.toLowerCase()))) &&
        (!criteria.type ||
          (criteria.type &&
            property.type
              .toLowerCase()
              .includes(criteria.type.toLowerCase()))) &&
        (!criteria.minPrice || property.price >= criteria.minPrice) &&
        (!criteria.maxPrice || property.price <= criteria.maxPrice) &&
        (!criteria.bedrooms || property.roomCount >= criteria.bedrooms)
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  getPropertyById(id: number): Observable<Property | undefined> {
    return this.properties$.pipe(
      map((properties) => properties.find((property) => property.id === id))
    );
  }

  paginateProperties(pageIndex: number, pageSize: number): Property[] {
    return this.propertiesSubject$.value.slice(
      pageIndex * pageSize,
      (pageIndex + 1) * pageSize
    );
  }
}
