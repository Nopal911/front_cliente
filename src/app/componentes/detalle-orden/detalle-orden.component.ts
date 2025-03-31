import { Component, OnInit } from '@angular/core';
import { DetalleOrdenService } from '../../servicios/detalle-orden.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  imports: [CommonModule,NavbarComponent,TableModule,CardModule],
  styleUrls: ['./detalle-orden.component.css']
})
export class DetalleOrdenComponent implements OnInit {
  detallesOrden: any[] = [];

  constructor(
    private detalleOrdenService: DetalleOrdenService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.obtenerDetallesOrden();
  }

  obtenerDetallesOrden(): void {
    this.detalleOrdenService.getDetallesOrden().subscribe(
      (response) => {
        this.detallesOrden = response.detalleOrden.map((detalle: any) => ({
          ...detalle,
          total: detalle.cantidad * detalle.precio_unitario
        }));
      },
      () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron obtener los detalles de orden' });
      }
    );
  }
}
