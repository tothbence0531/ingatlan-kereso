import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../modules/material.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { DecimalPipe, JsonPipe } from '@angular/common';
import { TexteditorComponent } from '../../components/texteditor/texteditor.component';
import { LengthError, ValidationErrors } from '../../models/errors.model';
import { Timestamp } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';

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

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.newListingForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(17),
          Validators.maxLength(1000),
        ],
      ],
      type: ['', [Validators.required, Validators.minLength(2)]],
      roomCount: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.minLength(2)]],
      images: [[], [Validators.required, this.arrayLengthValidator(3, 10)]],
    });
  }

  onSelect(event: NgxDropzoneChangeEvent) {
    console.log(event);
    const remainingSlots = 10 - this.uploadedFiles.length;
    const filesToAdd = event.addedFiles.slice(0, remainingSlots);

    this.uploadedFiles = [...this.uploadedFiles, ...filesToAdd];
    this.newListingForm.patchValue({
      images: this.uploadedFiles.map((f) => f.name),
    });
    console.log(filesToAdd);
  }

  onRemove(file: File) {
    this.uploadedFiles = this.uploadedFiles.filter((f) => f !== file);

    this.newListingForm.patchValue({
      images: this.uploadedFiles.map((f) => f.name),
    });
  }

  onContentChanged(content: string) {
    //console.log(content);
    this.newListingForm.patchValue({ description: content });
  }

  private arrayLengthValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !Array.isArray(control.value)) {
        return { invalidArray: true };
      }

      const length = control.value.length;

      if (length < min) {
        return { minLength: { requiredLength: min, actualLength: length } };
      }

      if (length > max) {
        return { maxLength: { requiredLength: max, actualLength: length } };
      }

      return null;
    };
  }

  async onSubmit() {}
}
