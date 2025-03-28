import { Injectable } from '@angular/core';
import { Property } from '../models/property.model';
import { BehaviorSubject } from 'rxjs';
import { SearchCriteria } from '../models/search.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private propertiesSubject$ = new BehaviorSubject<Property[]>([
    {
      id: 1,
      title: 'Modern garzonlakás',
      type: 'Garzonlakás',
      price: 15_000_000,
      location: 'Miskolc',
      description: 'Ez egy hosszu leiras most itt nekem',
      roomCount: 2,
      images: ['minkeraft.webp'],
    },
    {
      id: 2,
      title: 'College of Winterhold',
      type: 'Kastély',
      price: 10_000_000,
      location: 'Tamriel',
      description: 'Sarkanyharcos',
      roomCount: 53,
      images: ['winterhold.jpg'],
    },
    {
      id: 3,
      title: 'Amerikai Családi Ház',
      type: 'Kertesház',
      price: 100_000_000,
      location: 'Hódmezővásárhely',
      description: 'fasz',
      roomCount: 53,
      images: ['amcsi.webp'],
    },
    {
      id: 4,
      title: 'Pokol 217. szobája',
      type: 'Szoba',
      price: 10_000_000,
      location: 'Szeged',
      description: 'Pokol 217. szobája',
      roomCount: 30,
      images: ['irinyi.jpg'],
    },
    {
      id: 5,
      title: 'Tengerparti villa',
      type: 'Villa',
      price: 250_000_000,
      location: 'Balatonfüred',
      description: 'Lenyűgöző panoráma és saját strand.',
      roomCount: 8,
      images: ['balatonvilla.jpg'],
    },
    {
      id: 6,
      title: 'Panel a 9. emeleten',
      type: 'Lakás',
      price: 25_000_000,
      location: 'Budapest',
      description: 'Remek kilátás és közlekedés.',
      roomCount: 3,
      images: ['panel.webp'],
    },
    {
      id: 7,
      title: 'Hobbitlak',
      type: 'Földbe vájt ház',
      price: 40_000_000,
      location: 'Megye',
      description: 'Alacsony mennyezet, de kényelmes.',
      roomCount: 4,
      images: ['hobbit.jpg'],
    },
    {
      id: 8,
      title: 'Középkori kastély',
      type: 'Kastély',
      price: 500_000_000,
      location: 'Franciaország',
      description: 'Történelmi épület, hatalmas birtokkal.',
      roomCount: 20,
      images: ['kastely.jpg'],
    },
    {
      id: 9,
      title: 'Erdő mélyén búvóhely',
      type: 'Házikó',
      price: 35_000_000,
      location: 'Bakony',
      description: 'Tökéletes menedék a városi élet elől.',
      roomCount: 2,
      images: ['erdeihaz.jpg'],
    },
    {
      id: 10,
      title: 'Minimalista loft',
      type: 'Loft',
      price: 60_000_000,
      location: 'Berlin',
      description: 'Modern dizájn és hatalmas terek.',
      roomCount: 2,
      images: ['loft.webp'],
    },
    {
      id: 11,
      title: 'Hegyi menedék',
      type: 'Faház',
      price: 45_000_000,
      location: 'Alpok',
      description: 'Kilátás a havas csúcsokra.',
      roomCount: 3,
      images: ['fahaz.jpg'],
    },
    {
      id: 12,
      title: 'Üvegpalota',
      type: 'Modern ház',
      price: 300_000_000,
      location: 'Dubai',
      description: 'Üvegfalak és luxus mindenhol.',
      roomCount: 10,
      images: ['glasshouse.jpg'],
    },
    {
      id: 13,
      title: 'Szélmalom',
      type: 'Malomház',
      price: 55_000_000,
      location: 'Hollandia',
      description: 'Egyedi lakhatás egy szélmalomban.',
      roomCount: 4,
      images: ['szelmalom.jpg'],
    },
    {
      id: 14,
      title: 'Stúdiólakás belvárosban',
      type: 'Lakás',
      price: 20_000_000,
      location: 'Szeged',
      description: 'Fiataloknak tökéletes belvárosi lakás.',
      roomCount: 1,
      images: ['studio.jpg'],
    },
    {
      id: 15,
      title: 'Dűne-ház',
      type: 'Sci-fi épület',
      price: 599_999_999,
      location: 'Arrakis',
      description: 'Homokvihar álló technológia.',
      roomCount: 6,
      images: ['dunehouse.jpg'],
    },
    {
      id: 16,
      title: 'Űrállomás 3000',
      type: 'Űrállomás',
      price: 899_999_999,
      location: 'Föld körüli pálya',
      description: 'Luxus élet a csillagok között.',
      roomCount: 15,
      images: ['spacestation.jpg'],
    },
    {
      id: 17,
      title: 'Hagyományos parasztház',
      type: 'Parasztház',
      price: 18_000_000,
      location: 'Kalocsa',
      description: 'Falusi nyugalom és tornácos ház.',
      roomCount: 3,
      images: ['paraszthaz.jpg'],
    },
    {
      id: 18,
      title: 'Medencés luxuslak',
      type: 'Villa',
      price: 500_000_000,
      location: 'Los Angeles',
      description: 'Hatalmas medence és luxus.',
      roomCount: 7,
      images: ['luxvilla.jpg'],
    },
    {
      id: 19,
      title: 'Belső udvaros palota',
      type: 'Palota',
      price: 800_000_000,
      location: 'Isztambul',
      description: 'Ókori építészet modern kényelemmel.',
      roomCount: 25,
      images: ['palace.jpg'],
    },
    {
      id: 20,
      title: 'Extrém lakókocsi',
      type: 'Lakókocsi',
      price: 12_000_000,
      location: 'Magyarország',
      description: 'Mobil otthon a világ bármely pontján.',
      roomCount: 1,
      images: ['lakokocsi.webp'],
    },
  ]);
  public properties$ = this.propertiesSubject$.asObservable();

  constructor() {}

  filterProperties(criteria: SearchCriteria): Property[] {
    //console.log(criteria);
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
}
