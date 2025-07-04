import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateEntity, Entity } from 'app/core/interfaces/entity.interface';
import { EntityService } from 'app/features/entity/entity.service';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-entities',
  standalone: true,
  imports: [CommonModule, Button, Dialog, InputTextModule, FormsModule],
  providers: [MessageService],
  templateUrl: './entities.component.html',
  styleUrl: './entities.component.css',
})
export class EntitiesComponent implements OnInit {
  constructor(
    private entityService: EntityService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  entities: Entity[] = [];
  visible: boolean = false;

  entityToCreate: CreateEntity = {
    name: '',
  };

  ngOnInit(): void {
    this.entityService.getAllEntities().subscribe({
      next: (res: any) => {
        this.entities = res;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la informacion del dataset',
        });
      },
    });
  }

  deleteEntity(userID: string): void {
    console.log('Id a eliminar', userID);
  }
  //TODO
  updateEntity(userID: string): void {
    console.log('Id a eliminar', userID);
  }
  // TODO
  createEntity(event: Event): void {
    event.preventDefault();
    // console.log('Informaicion guardada', this.userToCreate);

    this.entityService.createEntity(this.entityToCreate).subscribe({
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
        });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'no se pudieron cargar los roles',
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
