import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MaterialModule } from '../../modules/material.module';
import { FooterComponent } from '../../components/footer/footer.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-about',
  imports: [NavbarComponent, MaterialModule, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  imageurlext: string = '';
  constructor(private themeService: ThemeService) {
    this.themeService.theme$.subscribe((theme) => {
      this.imageurlext = theme == 'light' ? '-light.png' : '-dark.png';
    });
  }
}
