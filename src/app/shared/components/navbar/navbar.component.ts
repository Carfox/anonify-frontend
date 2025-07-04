import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/features/auth/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('navbar') navbar!: ElementRef<HTMLElement>;
  @ViewChild('sidebar') sidebar!: ElementRef<HTMLElement>;
  @ViewChild('btnSidebarToggler') btnSidebarToggler!: ElementRef<HTMLElement>;
  @ViewChild('navClosed') navClosed!: ElementRef<HTMLElement>;
  @ViewChild('navOpen') navOpen!: ElementRef<HTMLElement>;
  
  // @ViewChild('si') dropdownRef!: ElementRef;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.sidebar.nativeElement.contains(event.target as Node) || this.navbar.nativeElement.contains(event.target as Node);
    if (!clickedInside) {
      // Acción al hacer clic fuera
      console.log('Clic fuera del componente sidebar y navbar');
      if (this.sidebarVisible) {
      
      this.closeSidebar(event);
      }

      // Puedes cerrar un menú, ocultar un panel, etc.
    }
  }
  private sidebarVisible = false;

  constructor(private renderer: Renderer2, private router: Router,private authService: AuthService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // this.renderer.listen(this.btnSidebarToggler.nativeElement, 'click', (event) => {
    //   event.preventDefault();
    //   this.toggleSidebar();
    // });
    // this.setSidebarTop();
  }

  toggleSidebar(event: Event): void {
    event.preventDefault();
    // isVisible: boolean = this.;

    console.log('El valor de sidebarVisible es:', this.sidebarVisible);

    this.sidebarVisible = !this.sidebarVisible;

    console.log('El valor de sidebarVisible es:', this.sidebarVisible);
    if (this.sidebarVisible) {
      this.renderer.addClass(this.sidebar.nativeElement, 'show');
      this.renderer.addClass(this.navClosed.nativeElement, 'hidden');
      this.renderer.removeClass(this.navOpen.nativeElement, 'hidden');
      console.log('test1');
    } else {
      
      this.renderer.removeClass(this.sidebar.nativeElement, 'show');
      this.renderer.removeClass(this.navClosed.nativeElement, 'hidden');
      this.renderer.addClass(this.navOpen.nativeElement, 'hidden');
      console.log('test1 else');
    }

  }
  closeSidebar(event: Event): void {
    event.preventDefault();
    this.sidebarVisible = false;
    this.renderer.removeClass(this.sidebar.nativeElement, 'show');
    this.renderer.removeClass(this.navClosed.nativeElement, 'hidden');
    this.renderer.addClass(this.navOpen.nativeElement, 'hidden');
    console.log('El valor de sidebarVisible es:', this.sidebarVisible);
  }
  navigateTo(event: Event, route: string): void {
    event.preventDefault();
    // console.log('El valor de route es:', route);
    this.router.navigate([route]);
  }
  isActive(route: string): boolean {
    // console.log('El valor de route es:', route);
    // console.log('El valor de this.router.url es:', this.router.url);
    // console.log('El valor de this.router.url === route es:', this.router.url === route);
    return this.router.url === route;
  }
  onLogout(event: Event){
    event.preventDefault();
    Swal.fire({
            title:
              'Estas seguro que deseas cerrar sesión?',
            // showDenyButton: true,
            icon: 'question',
            confirmButtonText: 'Confirmar',
            confirmButtonColor: '#3BBFA1',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#F87171'
      
            // denyButtonText: `Don't save`,
          }).then((result) => {
            if (result.isConfirmed) {
              
              this.authService.logout();
              setTimeout(()=>{this.router.navigate(['/login'])},500)

            }

          })
  }
}
