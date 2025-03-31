import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../../servicios/contacto.service';
import { MessageService } from 'primeng/api';
import { Contacto } from '../../interfaces/contacto';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-crudcontacto',
  templateUrl: './crudcontacto.component.html',
  imports: [TableModule, CommonModule, CardModule, NavbarComponent],
  styleUrls: ['./crudcontacto.component.css'],
  providers: [MessageService]
})
export class CrudcontactoComponent implements OnInit {
  contactos: Contacto[] = [];

  constructor(private contactoService: ContactoService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getContactos();
  }

  getContactos(): void {
    this.contactoService.getContacto().subscribe(
      (response) => {
        this.contactos = response.contactos;
      },
      (error) => {
        console.error('Error al obtener los contactos', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los contactos.' });
      }
    );
  }
}
