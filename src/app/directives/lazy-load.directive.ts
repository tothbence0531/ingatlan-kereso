import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
})
export class LazyLoadDirective implements OnChanges {
  @Input() appLazyLoad = '';

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appLazyLoad']) {
      this.observeImage();
    }
  }

  private observeImage() {
    if (this.observer) {
      this.observer.disconnect();
    }

    const imgElement: HTMLImageElement = this.el.nativeElement;
    imgElement.src = '';

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        imgElement.src = this.appLazyLoad;
        this.observer.disconnect();
      }
    });

    this.observer.observe(imgElement);
  }
}
