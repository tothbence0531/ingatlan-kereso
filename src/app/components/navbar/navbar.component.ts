import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {}
