import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {}
