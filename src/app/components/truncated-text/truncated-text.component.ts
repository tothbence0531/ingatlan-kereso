import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-truncated-text',
  templateUrl: './truncated-text.component.html',
  styleUrls: ['./truncated-text.component.scss'],
})
export class TruncatedTextComponent {
  @Input() text: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  get sanitizedText(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.text);
  }
}
