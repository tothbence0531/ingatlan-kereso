import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Property } from '../../models/property.model';
import { MaterialModule } from '../../modules/material.module';
import { CurrencyPipe } from '@angular/common';
import { LengthPipe } from '../../pipes/length.pipe';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-property-card',
  imports: [
    MaterialModule,
    CurrencyPipe,
    LengthPipe,
    LazyLoadDirective,
    RouterLink,
  ],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss',
})
export class PropertyCardComponent {
  @Input() property!: Property;
  @ViewChild('mainImage') mainImage!: ElementRef<HTMLImageElement>;

  changeMainImage(imagePath: string) {
    if (this.mainImage) {
      this.mainImage.nativeElement.src = `/assets/${imagePath}`;
    }
  }
}
