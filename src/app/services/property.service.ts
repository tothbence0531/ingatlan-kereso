import { inject, Injectable } from '@angular/core';
import { Property } from '../models/property.model';
import { firstValueFrom, map, Observable, take } from 'rxjs';

import { SearchCriteria } from '../models/search.model';
import { AuthService } from './auth.service';
import {
  collection,
  collectionData,
  Firestore,
  getDocs,
  orderBy,
  query,
  where,
  limit,
} from '@angular/fire/firestore';
import { addDoc, doc, getDoc, Query, updateDoc } from 'firebase/firestore';
import { AppUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  public properties$: Observable<Property[]>;
  private minPrice = 0;
  private maxPrice = 0;
  private firestore = inject(Firestore);
  private propertyCollection = collection(this.firestore, 'Properties');
  private userCollection = collection(this.firestore, 'Users');

  constructor(private authService: AuthService) {
    this.properties$ = this.loadProperties();
  }

  /**
   * loads all properties from firestore
   * @returns an observable that emits a list of all properties
   */
  private loadProperties(): Observable<Property[]> {
    const propertiesCollection = collection(this.firestore, 'Properties');
    return collectionData(propertiesCollection, {
      idField: 'id',
    }) as Observable<Property[]>;
  }

  /**
   * calculates the min and max price of a property array
   * @param properties property array to calculate min and max price from
   */
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

  /**
   * filters properties based on the supplied search criteria
   * @param criteria search criteria for filtering properties
   * @returns observable that emits a list of filtered properties
   */
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

  /**
   * gets a property by its id
   * @param propertyId string id of the property to get
   * @returns observable that emits the property with the given id
   */
  getPropertyById(propertyId: string): Observable<Property | undefined> {
    return this.properties$.pipe(
      map((properties) => properties.find((p) => p.id === propertyId))
    );
  }

  /**
   * strips a property array to a given page
   * @param pageIndex index of the pages
   * @param pageSize size of the pages
   * @returns stripped property array for the given page
   */
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

  /**
   * adds the supplied property data to firestore, updates the user's listings and returns the id of the added property
   * throws an error if the user is not logged in or is not a seller
   * id is random and is generated by firestore
   * created_at is set to the current date
   * owner is set to the user's uid
   * !!! images is set to ['missing-image.jpg', 'missing-image.jpg', 'missing-image.jpg'] !!! lack of firebase storage access
   * @param propertyData property data to add without id, created_at and owner
   * @returns  promise that resolves to the added property
   */
  async addProperty(
    propertyData: Omit<Property, 'id' | 'created_at' | 'owner' | 'images'>
  ): Promise<Property> {
    try {
      const userData = await firstValueFrom(
        this.authService.getCurrentUserData$().pipe(take(1))
      );

      if (!userData) {
        throw new Error('Felhasználó nincs bejelentkezve');
      }
      if (userData.role !== 'seller') {
        throw new Error('Csak értékesítő tud hozzáadni hirdetést');
      }

      const newProperty = {
        ...propertyData,
        created_at: new Date().toISOString(),
        owner: userData.uid,
        images: ['missing-image.jpg', 'missing-image.jpg', 'missing-image.jpg'],
      };

      const propertyDocRef = await addDoc(this.propertyCollection, newProperty);
      const propertyId = propertyDocRef.id;

      await updateDoc(propertyDocRef, { id: propertyId });

      const savedProperty: Property = {
        ...newProperty,
        id: propertyId,
      };

      const userDocRef = doc(this.userCollection, userData.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as AppUser;
        const listings = userData.listings || [];
        listings.push(propertyId);
        await updateDoc(userDocRef, { listings });
      }

      return savedProperty;
    } catch (error) {
      console.error('Error in property addition process:', error);
      throw error;
    }
  }

  async getListingsForCurrentUser(): Promise<Property[]> {
    const user = await firstValueFrom(
      this.authService.getCurrentUserData$().pipe(take(1))
    );

    if (!user) throw new Error('Felhasználó nincs bejelentkezve');

    const userDocRef = doc(this.userCollection, user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error('Felhasználó nincs bejelentkezve');
    }

    const userData = userDoc.data() as AppUser;

    if (userData.role != 'seller' || !userData.listings) {
      throw new Error('Nincsenek hirdetések');
    }

    const batchSize = 10;
    const batches = [];

    for (let i = 0; i < userData.listings.length; i += batchSize) {
      const batch = userData.listings.slice(i, i + batchSize);
      const q = query(this.propertyCollection, where('id', 'in', batch));
      batches.push(getDocs(q));
    }

    const batchSnapshots = await Promise.all(batches);
    const properties: Property[] = [];

    for (const snapshot of batchSnapshots) {
      snapshot.forEach((doc) => {
        const property = doc.data() as Property;
        if (!properties.some((p) => p.id === property.id)) {
          properties.push(property);
        }
      });
    }

    return properties;
  }

  async getSavedProperties(): Promise<Property[]> {
    const user = await firstValueFrom(
      this.authService.getCurrentUserData$().pipe(take(1))
    );

    if (!user) throw new Error('Felhasználó nincs bejelentkezve');

    const userDocRef = doc(this.userCollection, user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error('Felhasználó nincs bejelentkezve');
    }

    const userData = userDoc.data() as AppUser;

    if (!userData.savedProperties) {
      throw new Error('Nincsenek mentett ingatlanok');
    }

    const batchSize = 10;
    const batches = [];

    for (let i = 0; i < userData.savedProperties.length; i += batchSize) {
      const batch = userData.savedProperties.slice(i, i + batchSize);
      const q = query(this.propertyCollection, where('id', 'in', batch));
      batches.push(getDocs(q));
    }

    const batchSnapshots = await Promise.all(batches);
    const properties: Property[] = [];

    for (const snapshot of batchSnapshots) {
      snapshot.forEach((doc) => {
        const property = doc.data() as Property;
        if (!properties.some((p) => p.id === property.id)) {
          properties.push(property);
        }
      });
    }
    return properties;
  }

  async getSimilarProperties(
    reference: Property,
    limitPerQuery: number = 5
  ): Promise<Property[]> {
    const resultsMap = new Map<string, Property>();

    const queries: Query[] = [];

    const minPrice = reference.price * 0.8;
    const maxPrice = reference.price * 1.2;
    const priceQuery = query(
      this.propertyCollection,
      where('price', '>=', Math.floor(minPrice)),
      where('price', '<=', Math.ceil(maxPrice)),
      orderBy('price'),
      limit(limitPerQuery)
    );
    queries.push(priceQuery);

    const minRooms = reference.roomCount - 1;
    const maxRooms = reference.roomCount + 1;
    const roomsQuery = query(
      this.propertyCollection,
      where('rooms', '>=', minRooms),
      where('rooms', '<=', maxRooms),
      orderBy('rooms'),
      limit(limitPerQuery)
    );
    queries.push(roomsQuery);

    const typeQuery = query(
      this.propertyCollection,
      where('type', '==', reference.type),
      orderBy('type'),
      limit(limitPerQuery)
    );
    queries.push(typeQuery);

    const locationQuery = query(
      this.propertyCollection,
      where('location', '==', reference.location),
      orderBy('location'),
      limit(limitPerQuery)
    );
    queries.push(locationQuery);

    const snapshots = await Promise.all(queries.map((q) => getDocs(q)));

    for (const snapshot of snapshots) {
      snapshot.forEach((doc) => {
        const data = doc.data() as Property;
        if (data.id !== reference.id) {
          resultsMap.set(data.id, data);
        }
      });
    }

    return Array.from(resultsMap.values());
  }

  /**
   * toggles the save state of a property by its id.
   * @param propertyId property id to toggle save on
   * @returns a promise that resolves to void
   */
  async toggleSavedProperty(propertyId: string): Promise<void> {
    const user = await firstValueFrom(
      this.authService.getCurrentUserData$().pipe(take(1))
    );

    if (!user) throw new Error('Felhasználó nincs bejelentkezve');

    const userDocRef = doc(this.userCollection, user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error('Felhasználó nincs bejelentkezve');
    }

    const userData = userDoc.data() as AppUser;

    if (userData.savedProperties?.includes(propertyId)) {
      userData.savedProperties = userData.savedProperties.filter(
        (id) => id !== propertyId
      );

      return await updateDoc(userDocRef, { ...userData });
    }

    if (!userData.savedProperties) {
      userData.savedProperties = [];
    }

    userData.savedProperties.push(propertyId);

    await updateDoc(userDocRef, { savedProperties: userData.savedProperties });
  }

  /**
   * checks if a property is saved by its id.
   * @param propertyId property id to check
   * @returns observable that emits a boolean indicating if the property is saved
   */
  isPropertySaved(propertyId: string): Observable<boolean | undefined> {
    const user = this.authService.getCurrentUserData$();
    return user.pipe(
      map((user) => {
        if (!user) return false;
        return user.savedProperties?.includes(propertyId);
      })
    );
  }
}
