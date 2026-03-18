import { Injectable } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'book-app-theme';

  constructor() {
    this.initTheme();
  }

  get isDarkMode(): boolean {
    return this.getCurrentTheme() === 'dark';
  }

  toggleTheme(): void {
    const nextTheme: ThemeMode = this.isDarkMode ? 'light' : 'dark';
    this.applyTheme(nextTheme);
  }

  private initTheme(): void {
    const storedTheme = localStorage.getItem(this.storageKey) as ThemeMode | null;
    if (storedTheme === 'light' || storedTheme === 'dark') {
      this.applyTheme(storedTheme);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.applyTheme(prefersDark ? 'dark' : 'light');
  }

  private getCurrentTheme(): ThemeMode {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }

  private applyTheme(theme: ThemeMode): void {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(this.storageKey, theme);
  }
}
