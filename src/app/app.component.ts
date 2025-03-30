import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomPaginatorIntl } from './services/paginator-intl.service';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ingatlan-kereso';
}
