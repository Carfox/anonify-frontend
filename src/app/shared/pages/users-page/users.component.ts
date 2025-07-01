import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleInterface } from 'app/core/interfaces/role.interface';
import {
  CreateUser,
  UserPublicInformation,
} from 'app/core/interfaces/user.interface';
import { UserService } from 'app/features/users/user.service';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { RolesService } from 'app/features/roles/roles.service';

import countryFlagEmoji from 'country-flag-emoji';
import { CountryItem } from 'app/core/interfaces/country.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [Button, Dialog, InputTextModule, FormsModule, CommonModule],
  providers: [MessageService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private roleService: RolesService,
    private messageService: MessageService
  ) {}
  // countries: = (data as any).default as CountryItem[];
  // private messageService = inject(MessageService);
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
  roles: RoleInterface = {
    id: '',
    name: '',
    description: '',
    permissions: [],
  };
  countries: CountryItem = countryFlagEmoji.list;

  visible: boolean = false;

  ngOnInit(): void {
    // obtencion de lista de usuarios
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        console.log('Datos del usuario Obtenidos');
        this.users = res;
        this.cdr.detectChanges();
        // console.log('Users Info', this.users);
      },
      error: (err) => {
        console.error('Error al intentar obtener los datos de usuarios:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los datos del usuario.',
        });
      },
    });
    // obtiene la lista de roles
    this.roleService.getAllRoles().subscribe({
      next: (res: any) => {
        this.roles = res;
        this.cdr.detectChanges();
        // console.log('Roles Info', this.roles);

        // console.log('Countries:',this.countries);
      },
      error: (err) => {
        console.error('Error al intentar obtener los datos de roles:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los datos de roles',
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
  createUser(event: Event): void {
    event.preventDefault();
    console.log('Informaicion guardada', this.userToCreate);

    this.userService.createUser(this.userToCreate).subscribe({
      next: (res: any) => {
        if (!res.id) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.detail,
          });
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Usuario creado Correctamente',

          // window.location.reload();
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'no se pudieron cargar los roles ',
        });
      },
    });
    this.visible = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Se guardo el usuario correctamente.',
    });
  }
  reloadData(event: Event) {
    event.preventDefault();
    window.location.reload();
  }
  showDialog() {
    this.visible = true;
  }
}
