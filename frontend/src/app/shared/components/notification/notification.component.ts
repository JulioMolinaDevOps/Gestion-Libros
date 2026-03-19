import { Component, OnInit, OnDestroy } from '@angular/core';
import { Notification, NotificationService } from './notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  template: `
    <div class="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-[22rem] z-50 space-y-3">
      <div
        *ngFor="let notification of notifications"
        @slideIn
        class="max-w-sm w-full rounded-xl border bg-white/95 backdrop-blur shadow-xl pointer-events-auto overflow-hidden transition-all"
        [class.border-emerald-200]="notification.type === 'success'"
        [class.border-red-200]="notification.type === 'error'"
        [class.border-amber-200]="notification.type === 'warning'"
        [class.border-blue-200]="notification.type === 'info'"
        [class.dark:bg-gray-900]="true"
        [class.dark:border-emerald-800]="notification.type === 'success'"
        [class.dark:border-red-800]="notification.type === 'error'"
        [class.dark:border-amber-800]="notification.type === 'warning'"
        [class.dark:border-blue-800]="notification.type === 'info'"
      >
        <div
          class="h-1"
          [class.bg-emerald-500]="notification.type === 'success'"
          [class.bg-red-500]="notification.type === 'error'"
          [class.bg-amber-500]="notification.type === 'warning'"
          [class.bg-blue-500]="notification.type === 'info'"
        ></div>

        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg
                *ngIf="notification.type === 'success'"
                class="h-6 w-6 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                *ngIf="notification.type === 'error'"
                class="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                *ngIf="notification.type === 'warning'"
                class="h-6 w-6 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <svg
                *ngIf="notification.type === 'info'"
                class="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {{ notification.title || 'Notification' }}
              </p>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {{ notification.message }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                (click)="remove(notification)"
                class="rounded-md inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              >
                <span class="sr-only">Close</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private destroy$ = new Subject<void>();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe((notification) => {
        this.notifications.push(notification);
        setTimeout(() => this.remove(notification), notification.duration || 5000);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  remove(notification: Notification): void {
    const index = this.notifications.indexOf(notification);
    if (index > -1) {
      this.notifications.splice(index, 1);
    }
  }
}
