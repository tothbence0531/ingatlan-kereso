import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>(this.getInitialTheme());
  theme$ = this.themeSubject.asObservable();

  /**
   * either gets the data-theme attribute from the html element or defaults to 'dark'
   * @returns the initial theme of the app
   */
  private getInitialTheme(): string {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  /**
   * sets the theme to localstorage
   * @param theme 'light' | 'dark'
   */
  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    this.themeSubject.next(theme);
    localStorage.setItem('theme', theme);
  }

  /**
   * toggles the theme between 'light' and 'dark'
   */
  toggleTheme() {
    const currentTheme = this.getInitialTheme();
    this.setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }
}
