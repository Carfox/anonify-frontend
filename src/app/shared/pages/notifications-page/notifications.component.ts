import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotificationCardComponent } from 'app/shared/components/notification-card/notification-card.component';
import { TabsModule } from 'primeng/tabs';



interface Notification {
  type: 'success' | 'error' | 'info' | 'warning' | 'default';
  message: string;
  date: Date;
}


@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NotificationCardComponent,  CommonModule, TabsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class NotificationsComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef) {}

  notificationsCharged = false;

  notifications: Notification[] = [
    {
      type: 'success',
      message: 'El proyecto se ha creado correctamente.',
      date: new Date('2023-10-01T10:00:00'),
    },
    {
      type: 'error',
      message: 'Error al cargar el proyecto.',
      date: new Date('2023-10-02T11:30:00'),
    },
    {
      type: 'info',
      message: 'Se ha actualizado la configuración del usuario.',
      date: new Date('2023-10-03T14:15:00'),
    },
    {
      type: 'warning',
      message: 'El proyecto está a punto de caducar.',
      date: new Date('2023-10-04T09:45:00'),
    },
    {
      type: 'default',
      message: 'El proyecto está a punto de caducar.',
      date: new Date('2023-10-04T09:45:00'),
    },
  ];

  filteredNotifications = {
  info: [] as Notification[],
  error: [] as Notification[],
  success: [] as Notification[],
  warning: [] as Notification[],
  default: [] as Notification[],
};

ngOnInit() {
  this.filteredNotifications.info = this.notifications.filter(n => n.type === 'info');
  this.filteredNotifications.error = this.notifications.filter(n => n.type === 'error');
  this.filteredNotifications.success = this.notifications.filter(n => n.type === 'success');
  this.filteredNotifications.warning = this.notifications.filter(n => n.type === 'warning');
  this.filteredNotifications.default = this.notifications.filter(n => n.type === 'default');
  this.notificationsCharged = true;
  console.log('Notifications charged:', this.notificationsCharged);
  console.log('Filtered notifications:', this.filteredNotifications);
  this.cdr.detectChanges();
}



}
