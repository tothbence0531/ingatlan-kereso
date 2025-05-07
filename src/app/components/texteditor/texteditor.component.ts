import { Component, EventEmitter, Output } from '@angular/core';
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
  quillEditor: any;

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
    clipboard: {
      matchVisual: false,
    },
  };

  @Output() contentChanged = new EventEmitter<string>();

  onEditorCreated(editor: any) {
    this.quillEditor = editor;
    this.setupPlainTextPaste(editor);
  }

  onEditorChanged(event: string) {
    //console.log(event);
    this.contentChanged.emit(event);
  }

  private setupPlainTextPaste(editor: any) {
    editor.clipboard.addMatcher(Node.ELEMENT_NODE, (node: any, delta: any) => {
      const plainText = node.innerText || node.textContent;
      return new editor.constructor.imports.delta().insert(plainText);
    });
  }
}
