import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MaterialModule } from '../../modules/material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, SearchBarComponent, MaterialModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
