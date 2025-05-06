import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MaterialModule } from '../../modules/material.module';
import { NgIf } from '@angular/common';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-text-editor',
  templateUrl: './texteditor.component.html',
  styleUrls: ['./texteditor.component.scss'],
  imports: [MaterialModule, EditorModule],
})
export class TexteditorComponent {}
