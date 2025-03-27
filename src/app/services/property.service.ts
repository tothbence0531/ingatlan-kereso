import { Injectable } from '@angular/core';
import { Property } from '../models/property.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private propertiesSubject$ = new BehaviorSubject<Property[]>([
    {
      id: 1,
      title: 'Modern garzonlakás',
      type: 'Garzonlakás',
      price: 15000000,
      location: 'Miskolc',
      description: 'Ez egy hosszu leiras most itt nekem',
      roomCount: 2,
      images: ['minkeraft.webp'],
    },
    {
      id: 2,
      title: 'College of Winterhold',
      type: 'Kastély',
      price: 100000000,
      location: 'Tamriel',
      description: 'Sarkanyharcos',
      roomCount: 53,
      images: ['winterhold.jpg'],
    },
    {
      id: 3,
      title: 'Amerikai Családi Ház',
      type: 'Kertesház',
      price: 100000000,
      location: 'Hódmezővásárhely',
      description: 'fasz',
      roomCount: 53,
      images: ['amcsi.webp'],
    },
    {
      id: 4,
      title: 'Pokol 217. szobája',
      type: 'Szoba',
      price: 0,
      location: 'Szeged',
      description: 'Pokol 217. szobája',
      roomCount: 30,
      images: ['irinyi.jpg'],
    },
  ]);

  public properties$ = this.propertiesSubject$.asObservable();

  constructor() {}
}
