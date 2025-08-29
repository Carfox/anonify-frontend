import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ɵɵsetComponentScope } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CreateUser,
} from 'app/core/interfaces/user.interface';
import { UserService } from 'app/features/users/user.service';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RolesService } from 'app/features/roles/roles.service';
import countryFlagEmoji from 'country-flag-emoji';
import { CountryItem } from 'app/core/interfaces/country.interface';
import { forkJoin } from 'rxjs';
import { SpinnerIcon } from 'primeng/icons';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import Swal from 'sweetalert2';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    Button,
    Dialog,
    InputTextModule,
    FormsModule,
    CommonModule,
    SpinnerIcon,
    ProgressSpinnerModule,
    SelectModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit, AfterViewInit, OnChanges {
  private users: any;
  private roles: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private roleService: RolesService,
    private messageService: MessageService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.users || this.roles) {
      this.cdr.detectChanges();
    }
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  userToCreate: CreateUser = {
    name: '',
    nationality: '',
    mail: '',
    username: '',
    password: '',
    cell_phone: '',
    role_id: '',
  };

  countries: CountryItem[] = countryFlagEmoji.list;
  visible: boolean = false;

  loading: boolean = false; // ← al inicio

  ngOnInit(): void {
    this.loading = true;

    forkJoin({
      users: this.userService.getAllUsers(),
      roles: this.roleService.getAllRoles(),
    }).subscribe({
      next: ({ users, roles }) => {
        this.users = users;
        this.roles = roles;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los datos.',
        });
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  deleteUser(userID: string): void {
    console.log('Id a eliminar', userID);
    Swal.fire({
          title:
            'Estas seguro que deseas eliminar toda la información del Usuario?',
          // showDenyButton: true,
          icon: 'warning',
          confirmButtonText: 'Eliminar',
          confirmButtonColor: '#F77070',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
    
          // denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.userService.deleteUser(userID).subscribe({
              next: (res: any) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Éxito',
                  detail: 'Usuario eliminado correctamente.',
                  life: 3000,
                });
        
                this.reloadData();
              },
              error: (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'No se pudo eliminar el usuario. Información:'+err,
                  life: 3000,
                });
              },
            });
          }
        }
        );
  }

  updateUser(user: string ): void {
    console.log('Id a actualizar', user);

  }

  createUser(event: Event): void {
    event.preventDefault();
    console.log('Creando usuario', this.userToCreate);
    this.userService.createUser(this.userToCreate).subscribe({
      next: (res: any) => {
        if (!res.id) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.detail,
            life: 3000,
          });
          return;
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario creado correctamente.',
          life: 3000,
        });

        this.reloadData();
        this.resetUserForm();
        this.visible = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el usuario.'+err,
          life: 3000,
        });
      },
    });
  }

  

  reloadData(event?: Event) {
    if (event) event.preventDefault();
    window.location.reload();
  }

  showDialog() {
    this.visible = true;
  }

  resetUserForm(): void {
    this.userToCreate = {
      name: '',
      nationality: '',
      mail: '',
      username: '',
      password: '',
      cell_phone: '',
      role_id: '',
    };
  }
}


