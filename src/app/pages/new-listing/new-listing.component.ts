import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../modules/material.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { DecimalPipe } from '@angular/common';
import { TexteditorComponent } from '../../components/texteditor/texteditor.component';

@Component({
  selector: 'app-new-listing',
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    MaterialModule,
    NgxDropzoneModule,
    DecimalPipe,
    TexteditorComponent,
  ],
  templateUrl: './new-listing.component.html',
  styleUrl: './new-listing.component.scss',
})
export class NewListingComponent {
  newListingForm: FormGroup;
  uploadedFiles: File[] = [];

  constructor(private fb: FormBuilder) {
    this.newListingForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: [
        '',
        [Validators.required, Validators.minLength(2)],
        Validators.maxLength(1000),
      ],
      type: ['', [Validators.required, Validators.minLength(2)]],
      roomCount: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.minLength(2)]],
      images: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSelect(event: NgxDropzoneChangeEvent) {
    console.log(event);
    const remainingSlots = 10 - this.uploadedFiles.length;
    const filesToAdd = event.addedFiles.slice(0, remainingSlots);

    this.uploadedFiles = [...this.uploadedFiles, ...filesToAdd];
    console.log(filesToAdd);
  }

  onRemove(file: File) {
    this.uploadedFiles = this.uploadedFiles.filter((f) => f !== file);
  }

  onSubmit() {
    console.log(this.newListingForm.value);
  }
}
