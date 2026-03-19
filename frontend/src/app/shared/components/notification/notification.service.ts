import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  id: string;
  title?: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notifications$ = this.notificationSubject.asObservable();

  show(
    message: string,
    type: Notification['type'] = 'info',
    duration = 5000,
    title?: string
  ): void {
    const notification: Notification = {
      id: this.generateId(),
      title,
      message,
      type,
      duration,
    };
    this.notificationSubject.next(notification);
  }

  showSuccess(message: string, duration?: number, title = 'Success'): void {
    this.show(message, 'success', duration, title);
  }

  showError(message: string, duration?: number, title = 'Error'): void {
    this.show(message, 'error', duration, title);
  }

  showWarning(message: string, duration?: number, title = 'Warning'): void {
    this.show(message, 'warning', duration, title);
  }

  showInfo(message: string, duration?: number, title = 'Info'): void {
    this.show(message, 'info', duration, title);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
