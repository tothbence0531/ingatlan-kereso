import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      location: [''],
      type: [''],
      budget: [''],
    });
  }

  onSubmit() {
    console.log(this.searchForm.value);
  }
}
