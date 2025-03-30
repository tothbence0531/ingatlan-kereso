import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOpacityOnHover]',
})
export class OpacityOnHoverDirective {
  constructor(private el: ElementRef) {}
  @Input() opacityOnHover = '0.7';
  @Input() pointerCursor = true;
  @HostListener('mouseenter') onMouseEnter() {
    if (this.pointerCursor) {
      this.el.nativeElement.style.cursor = 'pointer';
    }
    this.el.nativeElement.style.opacity = this.opacityOnHover;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.opacity = 1;
  }
}
