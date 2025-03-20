import { Component, signal } from '@angular/core';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { Property } from '../../models/property.model';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-property-list',
  imports: [
    PropertyCardComponent,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    NavbarComponent,
  ],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent {
  showFiller = false;

  properties = signal<Property[]>([
    {
      id: '1',
      title: 'New House',
      price: 100,
      location: 'Sidney Street',
      description: 'Description 1',
      images: ['https://picsum.photos/id/100/200/300'],
    },
    {
      id: '2',
      title: 'Old House',
      price: 100,
      location: 'London Street',
      description: 'Description 2',
      images: ['https://picsum.photos/id/100/200/300'],
    },
    {
      id: '3',
      title: 'Haunted House',
      price: 100,
      location: 'Paris Street',
      description: 'Description 3',
      images: ['https://picsum.photos/id/100/200/300'],
    },
  ]);
}
