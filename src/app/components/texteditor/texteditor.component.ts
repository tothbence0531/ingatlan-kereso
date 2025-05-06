import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-text-editor',
  templateUrl: './texteditor.component.html',
  styleUrls: ['./texteditor.component.scss'],
  imports: [MaterialModule, QuillModule],
})
export class TexteditorComponent {
  text?: string;

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [
        {
          color: [
            '#000000',
            '#e60000',
            '#ff9900',
            '#ffff00',
            '#008a00',
            '#0066cc',
            '#9933ff',
            '#ffffff',
          ],
        },
      ],
      [
        {
          background: [
            '#000000',
            '#e60000',
            '#ff9900',
            '#ffff00',
            '#008a00',
            '#0066cc',
            '#9933ff',
            '#ffffff',
          ],
        },
      ],
    ],
  };
}
