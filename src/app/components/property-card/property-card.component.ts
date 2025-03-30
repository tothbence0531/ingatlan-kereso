import { Component, input, Input } from '@angular/core';
import { Property } from '../../models/property.model';
import { MaterialModule } from '../../modules/material.module';
import { CurrencyPipe } from '@angular/common';
import { LengthPipe } from '../../pipes/length.pipe';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';

@Component({
  selector: 'app-property-card',
  imports: [MaterialModule, CurrencyPipe, LengthPipe, LazyLoadDirective],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss',
})
export class PropertyCardComponent {
  @Input() property!: Property;
}
