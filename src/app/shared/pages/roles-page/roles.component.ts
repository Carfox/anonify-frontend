import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionInterface } from 'app/core/interfaces/permission.interface';
import { RoleInterface } from 'app/core/interfaces/role.interface';
import { PermissionService } from 'app/features/permissions/permission.service';
import { RolesService } from 'app/features/roles/roles.service';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [Button, Dialog, InputTextModule, CommonModule],
  providers: [MessageService],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {


  constructor(
  private cdr: ChangeDetectorRef,
  private route: ActivatedRoute,
  private router: Router,
  private roleService: RolesService,
  private permissionService:  PermissionService,
  private messageService: MessageService
  ){}

  roles: RoleInterface []= []
  permissions: PermissionInterface[] = []

  ngOnInit(): void {

    // obtener la lista de todos los roles
    this.roleService.getAllRoles().subscribe({

      next: (res: any) => {

        this.roles = res;
        this.cdr.detectChanges();

      },
      error: (err) => {
        this.messageService.add({

          severity: 'error',
          summary: 'Error',
          detail: 'no se pudieron cargar los roles'
        })
      }
    })
    // obtener la lista de todos los permisos 
    this.permissionService.getAllPermissions().subscribe({

      next: (res: any) => {

        this.permissions = res 
        this.cdr.detectChanges();

      },
      error: (err) => {

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los datos de permisos',
        });
      }




    })
  }

  hasPermission(permission_id: string, role_permisions: PermissionInterface[]): boolean {
  return role_permisions.some(p => p.id === permission_id) ?? false;
}
  
  


}
