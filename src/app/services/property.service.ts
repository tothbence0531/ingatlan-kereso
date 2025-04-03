import { Injectable } from '@angular/core';
import { Property } from '../models/property.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
      description:
        'Adipisicing aute deserunt et nisi adipisicing adipisicing velit ut excepteur irure. Consequat pariatur tempor Lorem exercitation amet deserunt in labore ex in culpa proident occaecat. Eiusmod dolor veniam labore duis ut voluptate ut amet excepteur. ~Ipsum officia exercitation consequat laborum excepteur. Elit consectetur ullamco elit sint sit magna commodo nulla excepteur ut est id cillum. Elit laborum dolor exercitation non laboris ex. Fugiat occaecat ex voluptate minim ut irure esse ut ea aute nisi. Velit sunt culpa eiusmod sint sit anim aute laboris proident cupidatat deserunt eu irure labore. Eiusmod quis occaecat nostrud cillum.Elit reprehenderit nostrud aliquip in deserunt tempor quis anim eiusmod. Exercitation excepteur eu do non Lorem consectetur anim id dolor labore mollit mollit ex. Labore anim incididunt quis officia sit eiusmod eu. Velit cupidatat magna irure sint voluptate laboris. Excepteur magna aliquip laborum do excepteur ipsum nulla officia cillum tempor ad eu.Esse non cupidatat minim fugiat. Nisi ea do culpa magna quis ex aliqua et excepteur do. Ex amet cillum labore anim id.Do magna sint esse sint non. Dolor aute adipisicing elit aliquip nulla sit nostrud Lorem ea occaecat sunt aute et Lorem. Nisi pariatur officia voluptate officia veniam amet.Nulla minim proident ea nulla dolor. Ea ut cillum tempor nisi laboris culpa. Voluptate et nisi exercitation sit labore reprehenderit eiusmod aute. Do occaecat in cupidatat ut ullamco adipisicing sunt. Veniam id amet commodo tempor Lorem voluptate non officia enim. Tempor ut ad ex ea aliqua dolore sint sunt tempor.',
      roomCount: 2,
      images: ['minkeraft.webp'],
      created_at: new Date(),
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
      created_at: new Date(),
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
      created_at: new Date(),
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
      created_at: new Date(),
    },
    {
      id: 5,
      title: 'Tengerparti villa',
      type: 'Villa',
      price: 250_000_000,
      location: 'Balatonfüred',
      description:
        'Az A- Villa (Vendégház) légkondicionált szállással, valamint fürdő- és wellnessközponttal várja vendégeit Balatonfüreden, a tihanyi apátságtól 8,4 km-re, az Annagora Aquaparktól pedig 2,4 km-re. Az erkélyes szálláshely ingyenes wifit és díjmentes magánparkolót kínál. A villa tóra néző medencével, szaunával és közös konyhával rendelkezik. Az 5 hálószobás, tágas villában 3 fürdőszoba, ágyneműhuzat és törölköző, streamingszolgáltatást kínáló, síkképernyős tévé, étkezősarok, teljesen felszerelt konyha található. A terasz a hegyekre nyújt kilátást. A vendégek a medencére néző, szabadtéri étkezősarokban is étkezhetnek. A zavartalan pihenést külön bejárat is szolgálja.A beltéri medencében és a pezsgőfürdőben kellemes lazításra nyílik lehetőség. A villakomplexumhoz szabadtéri tűzrakóhely és piknikezőterület is tartozik.Balatonfüred vasútállomása 2,4 km-re, a tihanyi Belső-tó pedig 10 km-re van az épülettől. A legközelebbi reptér a 76 km-re fekvő Hévíz–Balaton repülőtér.',
      roomCount: 8,
      images: ['balatonvilla.jpg', 'balatonvilla2.jpg', 'balatonvilla3.jpg'],
      created_at: new Date(),
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
      created_at: new Date(),
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
      created_at: new Date(),
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
      created_at: new Date(),
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
      created_at: new Date(),
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
      created_at: new Date(),
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
      created_at: new Date(),
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
      created_at: new Date(),
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
      created_at: new Date(),
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
      created_at: new Date(),
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
      created_at: new Date(),
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
      created_at: new Date(),
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
      created_at: new Date(),
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
      created_at: new Date(),
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
      created_at: new Date(),
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
      created_at: new Date(),
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
