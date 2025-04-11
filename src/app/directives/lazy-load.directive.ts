import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
})
export class LazyLoadDirective implements OnChanges, OnDestroy {
  @Input() appLazyLoad = '';

  private observer: IntersectionObserver | null = null;
  private _imageLoaded = false;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appLazyLoad']) {
      this._imageLoaded = false;
      this.observeImage();
    }
  }

  ngOnDestroy() {
    this.disconnectObserver();
  }

  private observeImage() {
    this.disconnectObserver();

    const imgElement: HTMLImageElement = this.el.nativeElement;

    if (!this._imageLoaded) {
      imgElement.src = '';
      imgElement.style.opacity = '0';
      imgElement.style.transition = 'opacity 0.3s ease';
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this._imageLoaded) {
          imgElement.src = this.appLazyLoad;
          imgElement.onload = () => {
            this._imageLoaded = true;
            imgElement.style.opacity = '1';
            this.disconnectObserver();
          };
        }
      },
      {
        rootMargin: '200px',
      }
    );

    this.observer.observe(imgElement);
  }

  private disconnectObserver() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
