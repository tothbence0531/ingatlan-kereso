import { inject, Injectable } from '@angular/core';
import { Property } from '../models/property.model';
import { BehaviorSubject, catchError, from, map, Observable, of } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { SearchCriteria } from '../models/search.model';
import propertiesData from '../../../public/assets/data/properties.json';
import { AuthService } from './auth.service';
import {
  collection,
  collectionData,
  docData,
  Firestore,
  Timestamp,
} from '@angular/fire/firestore';
import { doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  public properties$: Observable<Property[]>;
  private minPrice = 0;
  private maxPrice = 0;
  private firestore = inject(Firestore);

  constructor(private authService: AuthService) {
    this.properties$ = this.loadProperties();
  }

  private loadProperties(): Observable<Property[]> {
    const propertiesCollection = collection(this.firestore, 'Properties');
    return collectionData(propertiesCollection, {
      idField: 'id',
    }) as Observable<Property[]>;
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

  filterProperties(criteria: SearchCriteria): Observable<Property[]> {
    return this.properties$.pipe(
      map((properties) =>
        properties.filter((property) => {
          return (
            (!criteria.location ||
              property.location
                .toLowerCase()
                .includes(criteria.location.toLowerCase())) &&
            (!criteria.type ||
              property.type
                .toLowerCase()
                .includes(criteria.type.toLowerCase())) &&
            (!criteria.minPrice || property.price >= criteria.minPrice) &&
            (!criteria.maxPrice || property.price <= criteria.maxPrice) &&
            (!criteria.bedrooms || property.roomCount >= criteria.bedrooms)
          );
        })
      )
    );
  }

  getPropertyById(propertyId: string): Observable<Property | undefined> {
    return this.properties$.pipe(
      map((properties) => properties.find((p) => p.id === propertyId))
    );
  }

  paginateProperties(
    pageIndex: number,
    pageSize: number
  ): Observable<Property[]> {
    return this.properties$.pipe(
      map((properties) =>
        properties.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
      )
    );
  }
}
