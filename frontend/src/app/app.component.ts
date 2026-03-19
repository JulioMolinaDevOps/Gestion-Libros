import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  template: `
    <button
      type="button"
      (click)="toggleTheme()"
      [attr.aria-label]="themeService.isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'"
      class="fixed right-4 top-4 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-md transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
    >
      <svg
        *ngIf="!themeService.isDarkMode"
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        ></path>
      </svg>
      <svg
        *ngIf="themeService.isDarkMode"
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        ></path>
      </svg>
    </button>

    <app-notification></app-notification>
    <app-confirm-dialog></app-confirm-dialog>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Book Management';

  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
