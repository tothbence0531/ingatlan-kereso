import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSnackbarComponent } from './error-snackbar.component';

describe('ErrorSnackbarComponent', () => {
  let component: ErrorSnackbarComponent;
  let fixture: ComponentFixture<ErrorSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
