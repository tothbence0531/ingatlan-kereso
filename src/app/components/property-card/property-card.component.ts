import { Component, input, Input } from '@angular/core';
import { Property } from '../../models/property.model';
import { MaterialModule } from '../../modules/material.module';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-property-card',
  imports: [MaterialModule, CurrencyPipe],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss',
})
export class PropertyCardComponent {
  @Input() property!: Property;

  ngOnInit(): void {
    console.log(this.property);
  }
}
