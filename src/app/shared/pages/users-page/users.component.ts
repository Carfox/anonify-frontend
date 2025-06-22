import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// import {Projec}
import {
  CreateUser,
  UserPublicInformation,
} from 'app/core/interfaces/user.interface';
import { UserService } from 'app/features/users/user.service';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [Button, Dialog, InputTextModule, FormsModule],
  providers: [MessageService, UserService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    // private messageService: MessageService
  ) {}

  private messageService = inject(MessageService);
  users: UserPublicInformation[] = [];
  userToCreate: CreateUser = {
    name: '',
    nationality: '',
    mail: '',
    username: '',
    password: '',
    cell_phone: '',
    role_id: '',
  };
  visible: boolean = false;

  ngOnInit(): void {
    // obtencion de lista de usuarios
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        console.log('Datos del usuario Obtenidos');
        this.users = res;
        this.cdr.detectChanges();
        console.log('Users Info', this.users);
      },
      error: (err) => {
        console.error('Error al intentar obtener los datos de usuarios:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los datos del proyecto.',
        });
      },
    });
  }

  //TODO
  deleteUser(userID: string): void {
    console.log('Id a eliminar', userID);
  }
  //TODO
  updateUser(userID: string): void {
    console.log('Id a eliminar', userID);
  }
  // TODO
  createUser(): void {
    console.log('Informaicion guardada', this.userToCreate);

    this.visible =false

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Se guardo el usuario correctamente.',
    });
  }
  showDialog() {
    this.visible = true;
  }
}
