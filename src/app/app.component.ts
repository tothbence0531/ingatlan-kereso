import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomPaginatorIntl } from './services/paginator-intl.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ThemeService } from './services/theme.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  themeService = inject(ThemeService);

  ngOnInit(): void {
    const storageTheme = localStorage.getItem('theme');
    if (storageTheme) {
      this.themeService.setTheme(storageTheme);
    }
  }
}
