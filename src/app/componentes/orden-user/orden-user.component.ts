import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../../servicios/orden.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Orden } from '../../interfaces/orden';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-ordenes',
  templateUrl: './orden-user.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    TableModule,
    CommonModule,
    CardModule,
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  styleUrls: ['./orden-user.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class OrdenUserComponent implements OnInit {
  ordenes: Orden[] = [];
  newOrden: Orden = { id: undefined, usuario_email: '', fecha: '', total: 0, estado: 'pendiente' };
  selectedOrderId: number | null = null;
  editMode: boolean = false;

  constructor(
    private ordenService: OrdenService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getOrdenes();
  }

  getOrdenes(): void {
    const email = sessionStorage.getItem("email");
    
    if (email) {
      this.ordenService.getOrdenes().subscribe(
        (response) => {
          // Filtrar las órdenes para mostrar solo las del usuario en sesión
          this.ordenes = response.ordenes.filter((orden: Orden) => orden.usuario_email === email);
        },
        (error) => {
          console.error('Error fetching orders', error);
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'No se pudieron cargar las órdenes.' 
          });
        }
      );
    } else {
      this.ordenes = [];
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'Sesión requerida', 
        detail: 'Debes iniciar sesión para ver tus órdenes.' 
      });
    }
  }

  // ... (los demás métodos se mantienen igual)
  addOrden(): void {
    const email = sessionStorage.getItem("email");
    if (email) {
      this.newOrden.usuario_email = email;
    }
    
    this.ordenService.addOrden(this.newOrden).subscribe(
      () => {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Orden Agregada', 
          detail: 'La nueva orden se ha agregado correctamente.' 
        });
        this.getOrdenes();
        this.clearForm();
      },
      (error) => {
        console.error('Error adding order', error);
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'No se pudo agregar la orden.' 
        });
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
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Orden Actualizada', 
            detail: 'La orden se ha actualizado correctamente.' 
          });
          this.getOrdenes();
          this.clearForm();
        },
        (error) => {
          console.error('Error updating order', error);
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'No se pudo actualizar la orden.' 
          });
        }
      );
    }
  }

  deleteOrden(id: number | undefined): void {
    if (!id) return;

    this.confirmationService.confirm({
      message: '¿Seguro que quieres cancelar tu compra?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.ordenService.deleteOrden(id).subscribe(
          () => {
            this.messageService.add({ 
              severity: 'success', 
              summary: 'Orden Eliminada', 
              detail: 'La orden se ha eliminado correctamente.' 
            });
            this.getOrdenes();
          },
          (error) => {
            console.error('Error deleting order', error);
            this.messageService.add({ 
              severity: 'error', 
              summary: 'Error', 
              detail: 'No se pudo eliminar la orden.' 
            });
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Eliminación cancelada',
          life: 3000
        });
      }
    });
  }

  clearForm(): void {
    this.newOrden = { id: undefined, usuario_email: '', fecha: '', total: 0, estado: 'pendiente' };
    this.editMode = false;
  }
}