import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../../servicios/orden.service';
import { MessageService } from 'primeng/api';
import { Orden } from '../../interfaces/orden';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  imports: [FormsModule,ButtonModule,TableModule,CommonModule,CardModule,NavbarComponent],
  styleUrls: ['./ordenes.component.css'],
  providers: [MessageService]
})
export class OrdenesComponent implements OnInit {
  ordenes: Orden[] = [];
  newOrden: Orden = { id: undefined, usuario_email: '', fecha: '', total: 0, estado: 'pendiente' };
  selectedOrderId: number | null = null;
  editMode: boolean = false;

  constructor(private ordenService: OrdenService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getOrdenes();
  }

  getOrdenes(): void {
    this.ordenService.getOrdenes().subscribe(
      (response) => {
        this.ordenes = response.ordenes;
      },
      (error) => {
        console.error('Error fetching orders', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las órdenes.' });
      }
    );
  }

  addOrden(): void {
    this.ordenService.addOrden(this.newOrden).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Orden Agregada', detail: 'La nueva orden se ha agregado correctamente.' });
        this.getOrdenes();
        this.clearForm();
      },
      (error) => {
        console.error('Error adding order', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo agregar la orden.' });
      }
    );
  }

  editOrder(order: Orden): void {
    this.selectedOrderId = order.id ?? null;
    this.newOrden = { ...order };
    this.editMode = true;
  }

  updateOrden(): void {
    if (this.selectedOrderId) {
        const ordenToUpdate = { 
            ...this.newOrden,
            id: this.selectedOrderId
        };
 
        this.ordenService.updateOrden(ordenToUpdate).subscribe(
            () => {
                this.messageService.add({ severity: 'success', summary: 'Orden Actualizada', detail: 'La orden se ha actualizado correctamente.' });
                this.getOrdenes();
                this.clearForm();
            },
            (error) => {
                console.error('Error updating order', error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la orden.' });
            }
        );
    }
 }
 

  deleteOrden(id: number): void {
    this.ordenService.deleteOrden(id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Orden Eliminada', detail: 'La orden se ha eliminado correctamente.' });
        this.getOrdenes();
      },
      (error) => {
        console.error('Error deleting order', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la orden.' });
      }
    );
  }

  clearForm(): void {
    this.newOrden = { id: undefined, usuario_email: '', fecha: '', total: 0, estado: 'pendiente' };
    this.editMode = false;
  }
}
