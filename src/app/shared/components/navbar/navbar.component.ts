import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from 'app/features/auth/auth.service';
import Swal from 'sweetalert2';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    BadgeModule,
    RippleModule,
    AvatarModule,
    RippleModule,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  userName: string = '';
  userRole: string = '';

  constructor(private router: Router, protected authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.userName = user?.username || 'Usuario';
      this.userRole = user?.role?.name || 'Sin rol';
    });

    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/a/home',
      },
      {
        label: 'Proyectos',
        icon: 'pi pi-folder',
        visible: this.authService.hasPermission('view_project'),
        routerLink: '/a/projects',
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-users',
        visible: this.authService.hasPermission('view_user'),
        routerLink: '/a/users',
      },
      {
        label: 'Roles',
        icon: 'pi pi-lock',
        visible: this.authService.hasPermission('view_role'),
        routerLink: '/a/roles',
      },
      {
        label: 'Entidades',
        icon: 'pi pi-sitemap',
        visible: this.authService.hasPermission('view_entity'),
        routerLink: '/a/entities',
      },
      {
        separator: true,
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        styleClass: 'text-red-500',
        command: () => this.onLogout(),
      },
    ];
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
  navigateToUserInfo() {
    this.router.navigate(['/a/user_information']);
  }


  onLogout(): void {
    Swal.fire({
      title: '¿Estás seguro que deseas cerrar sesión?',
      icon: 'question',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#3BBFA1',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#F87171',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        setTimeout(() => this.router.navigate(['/login']), 500);
      }
    });
  }
}
