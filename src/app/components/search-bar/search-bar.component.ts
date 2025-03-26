import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-search-bar',
  imports: [MaterialModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {}
