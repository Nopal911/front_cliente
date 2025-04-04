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
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  imports: [FormsModule, ButtonModule, TableModule, CommonModule, CardModule, NavbarComponent,ToastModule],
  styleUrls: ['./ordenes.component.css'],
  providers: [MessageService]
})
export class OrdenesComponent implements OnInit {
  ordenes: Orden[] = [];
  newOrden: Orden = { id: undefined, usuario_email: '', fecha: '', total: 0, estado: 'pendiente' };
  selectedOrderId: number | null = null;
  editMode: boolean = false;

  constructor(
    private ordenService: OrdenService, 
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getOrdenes();
  }

  getOrdenes(): void {
    this.ordenService.getOrdenes().subscribe({
      next: (response) => {
        this.ordenes = response.ordenes;
        this.messageService.add({
          severity: 'success',
          summary: 'Órdenes cargadas',
          detail: 'Lista de órdenes actualizada',
          life: 3000
        });
      },
      error: (error) => {
        console.error('Error fetching orders', error);
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'No se pudieron cargar las órdenes',
          life: 3000
        });
      }
    });
  }

  addOrden(): void {
    // Validar email del usuario
    const userEmail = sessionStorage.getItem('email');
    if (!userEmail) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Acción requerida',
        detail: 'Debes iniciar sesión para crear una orden',
        life: 3000
      });
      return;
    }

    this.newOrden.usuario_email = userEmail;
    
    this.ordenService.addOrden(this.newOrden).subscribe({
      next: () => {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Éxito', 
          detail: 'Orden creada correctamente',
          life: 3000
        });
        this.getOrdenes();
        this.clearForm();
      },
      error: (error) => {
        console.error('Error adding order', error);
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Error al crear la orden: ' + error.message,
          life: 3000
        });
      }
    });
  }

  editOrder(order: Orden): void {
    this.selectedOrderId = order.id ?? null;
    this.newOrden = { ...order };
    this.editMode = true;
    this.messageService.add({
      severity: 'info',
      summary: 'Modo edición',
      detail: 'Estás editando la orden #' + order.id,
      life: 3000
    });
  }

  updateOrden(): void {
    if (this.selectedOrderId) {
      const ordenToUpdate = { 
        ...this.newOrden,
        id: this.selectedOrderId
      };

      this.ordenService.updateOrden(ordenToUpdate).subscribe({
        next: () => {
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Actualizado', 
            detail: 'Orden actualizada correctamente',
            life: 3000
          });
          this.getOrdenes();
          this.clearForm();
        },
        error: (error) => {
          console.error('Error updating order', error);
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Error al actualizar: ' + error.message,
            life: 3000
          });
        }
      });
    }
  }

  deleteOrden(id: number): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Confirmar',
      detail: '¿Estás seguro de eliminar esta orden?',
      life: 3000,
      sticky: true,
      closable: true,
      data: {
        action: () => {
          this.ordenService.deleteOrden(id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Eliminada',
                detail: 'Orden eliminada correctamente',
                life: 3000
              });
              this.getOrdenes();
            },
            error: (error) => {
              console.error('Error deleting order', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar la orden',
                life: 3000
              });
            }
          });
        }
      }
    });
  }

  clearForm(): void {
    this.newOrden = { id: undefined, usuario_email: '', fecha: '', total: 0, estado: 'pendiente' };
    this.editMode = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Formulario',
      detail: 'Formulario reiniciado',
      life: 2000
    });
  }
}