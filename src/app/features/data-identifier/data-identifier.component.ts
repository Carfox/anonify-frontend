import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { Listbox } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { IdentifierCardComponent } from './components/identifier-card/identifier-card.component';
import { Header } from 'app/core/interfaces/header.interface';
import { IdentifierType } from 'app/core/interfaces/identifierType.interface';
import { FileService } from 'app/core/services/file.service';

@Component({
  standalone: true,
  imports: [
    DividerModule,
    CommonModule,
    FormsModule,
    IdentifierCardComponent,
    Listbox,
  ],
  templateUrl: './data-identifier.component.html',
  styleUrl: './data-identifier.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataIdentifierComponent {
  public headers!: Header[];
  public selectedHeader!: string;
  public identifierTypeList: IdentifierType[] = [
    {
      label: 'Identificador Directo',
      value: 'directIdentifier',
      description: 'Datos que identifican a una persona',
    },
    {
      label: 'Identificador Indirecto',
      value: 'indirectIdentifier',
      description: 'Datos que identifican a una persona',
    },
    {
      label: 'Identificador Datos Sensitivos',
      value: 'sensitiveDataIdentifier',
      description: 'Datos que identifican a una persona',
    },
    {
      label: 'Identificador  Datos No Sensitivos',
      value: 'noSensitiveDataIdentifier',
      description: 'Datos que identifican a una persona',
    },
  ];

  constructor(
    private fileService: FileService,
    private cdr: ChangeDetectorRef
  ) {
    this.fileService.getheadersFromFile().subscribe((res: any) => {
      console.log(res);
      this.headers = res.data;
      this.cdr.detectChanges();
    });
  }

  // saveIdentifier() {
  //   this.fileService.saveIdentifier();
  // }
}
