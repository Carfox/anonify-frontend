import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'notification-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.css'
})
export class NotificationCardComponent {
  @Input({ required: true }) type:  'success' | 'error' | 'info' | 'warning' | 'default';
  @Input({ required: true }) message: string;
  @Input({ required: true }) date:  Date;





}
