import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchCriteria } from '../../models/search.model';

@Component({
  selector: 'app-search-bar',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.searchForm = this.fb.group({
      location: [''],
      type: [''],
      maxPrice: [''],
    });
  }

  onSubmit() {
    const formData: SearchCriteria = this.searchForm.value;
    //console.log(formData);
    this.router.navigate(['/properties'], {
      queryParams: formData,
    });
  }
}
