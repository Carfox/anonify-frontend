import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NotificationService } from 'app/features/notifications/notification.service';
import { NotificationCardComponent } from 'app/shared/components/notification-card/notification-card.component';
import { TabsModule } from 'primeng/tabs';

interface Notification {
  id: string;

  type: 'success' | 'error' | 'info' | 'warning' | 'default';
  message: string;
  date: Date;
  is_read: boolean;
  // user_id: string;
  project_id?: string | null;
  dataset_id?: string | null;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NotificationCardComponent, CommonModule, TabsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  notificationsCharged = false;
  filteredNotifications = {
    info: [] as Notification[],
    error: [] as Notification[],
    success: [] as Notification[],
    warning: [] as Notification[],
    default: [] as Notification[],
  };
  constructor(
    private cdr: ChangeDetectorRef,
    private notificationsService: NotificationService
  ) {}

  // notifications: Notification[] = [
  //   {
  //     type: 'success',
  //     message: 'El proyecto se ha creado correctamente.',
  //     date: new Date('2023-10-01T10:00:00'),
  //   },
  //   {
  //     type: 'error',
  //     message: 'Error al cargar el proyecto.',
  //     date: new Date('2023-10-02T11:30:00'),
  //   },
  //   {
  //     type: 'info',
  //     message: 'Se ha actualizado la configuración del usuario.',
  //     date: new Date('2023-10-03T14:15:00'),
  //   },
  //   {
  //     type: 'warning',
  //     message: 'El proyecto está a punto de caducar.',
  //     date: new Date('2023-10-04T09:45:00'),
  //   },
  //   {
  //     type: 'default',
  //     message: 'El proyecto está a punto de caducar.',
  //     date: new Date('2023-10-04T09:45:00'),
  //   },
  // ];

  ngOnInit() {
    console.log('Component initialized. Fetching notifications...');

    this.notificationsService.getUserNotifications().subscribe({
      next: (data: any) => {
        console.log('Notifications fetched from service:', data);
        // this.notifications = data as Notification[];
        // Ordena las notificaciones aquí antes de asignarlas
        // Convertimos las fechas a objetos Date para una comparación precisa.
        this.notifications = data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          // Si quieres la más reciente primero, b - a.
          return dateB.getTime() - dateA.getTime();
        });
        this.filteredNotifications.info = this.notifications.filter(
          (n) => n.type === 'info'
        );
        this.filteredNotifications.error = this.notifications.filter(
          (n) => n.type === 'error'
        );
        this.filteredNotifications.success = this.notifications.filter(
          (n) => n.type === 'success'
        );
        this.filteredNotifications.warning = this.notifications.filter(
          (n) => n.type === 'warning'
        );
        this.filteredNotifications.default = this.notifications.filter(
          (n) => n.type === 'default'
        );
        this.notificationsCharged = true;
        console.log('Notifications charged:', this.notificationsCharged);
        console.log('Filtered notifications:', this.filteredNotifications);
        this.cdr.detectChanges();
      },
    });
  }
}
