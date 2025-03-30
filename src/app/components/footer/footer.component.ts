import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { OpacityOnHoverDirective } from '../../directives/opacity-on-hover.directive';

@Component({
  selector: 'app-footer',
  imports: [MaterialModule, OpacityOnHoverDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
