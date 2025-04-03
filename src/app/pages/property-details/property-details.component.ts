import { Component, inject, model, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MaterialModule } from '../../modules/material.module';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TruncatedTextComponent } from '../../components/truncated-text/truncated-text.component';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDialogComponent } from './appointment-dialog/appointment-dialog.component';

@Component({
  selector: 'app-property-details',
  imports: [
    NavbarComponent,
    FooterComponent,
    MaterialModule,
    DatePipe,
    TruncatedTextComponent,
    CurrencyPipe,
  ],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss',
})
export class PropertyDetailsComponent implements OnInit {
  property!: Property;
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (!propertyId) {
      this.router.navigate(['/not-found']);
      return;
    }
    this.propertyService
      .getPropertyById(parseInt(propertyId))
      .subscribe((property) => {
        if (property) {
          this.property = property;
        } else {
          this.router.navigate(['/not-found']);
        }
      });
  }

  openDialog(): void {
    const appRoot = document.querySelector('app-root');
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      data: { name: this.name(), animal: this.animal() },
    });

    dialogRef.afterOpened().subscribe(() => {
      if (appRoot) {
        appRoot.setAttribute('inert', '');
      }
      console.log(appRoot);
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }
}
