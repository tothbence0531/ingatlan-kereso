import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PropertyListComponent } from './pages/property-list/property-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PropertyListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ingatlan-kereso';
}
