import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>(this.getInitialTheme());
  theme$ = this.themeSubject.asObservable();

  private getInitialTheme(): string {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    this.themeSubject.next(theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const currentTheme = this.getInitialTheme();
    this.setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }
}
