import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserPublic, UserPublicInformation } from 'app/core/interfaces/user.interface';
import { UserService } from 'app/features/users/user.service';

@Component({
  selector: 'app-userinfo',
  standalone: true,
  imports: [],
  templateUrl: './userinfo.component.html',
  styleUrl: './userinfo.component.css',
})
export class UserinfoComponent implements OnInit {
  
  userInfo: UserPublic = {
    id: '',
    name: '',
    nationality: '',
    mail: '',
    username: '',
    cell_phone: '',
    role:
      {
        id:"",
        name: ""
      },
  }
  constructor(private userService: UserService,private cdr: ChangeDetectorRef) {}


  ngOnInit(): void {
    this.userService.getUserInfo().subscribe({
      next: (res: any) => {
        this.userInfo = res
        console.log('Usuario Guardado:', this.userInfo);
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error('Error', err);
      },
    });
  }

  onReload(event: Event){
    event.preventDefault();
    window.location.reload();

  }
}
