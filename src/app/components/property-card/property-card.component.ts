import { Component, input, Input } from '@angular/core';
import { Property } from '../../models/property.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-property-card',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss',
})
export class PropertyCardComponent {
  @Input() property!: Property;
}
