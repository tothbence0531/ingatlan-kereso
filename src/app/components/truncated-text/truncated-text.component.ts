import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-truncated-text',
  imports: [MaterialModule],
  templateUrl: './truncated-text.component.html',
  styleUrl: './truncated-text.component.scss',
})
export class TruncatedTextComponent {
  @Input() text: string = '';
  @Input() maxLength: number = 150;

  isExpanded = false;

  get truncatedText(): string {
    if (!this.text || this.text.length <= this.maxLength || this.isExpanded) {
      return this.text;
    }
    return this.text.substring(0, this.maxLength);
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}
