import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSearchbarComponent } from './detailed-searchbar.component';

describe('DetailedSearchbarComponent', () => {
  let component: DetailedSearchbarComponent;
  let fixture: ComponentFixture<DetailedSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedSearchbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
