import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/product.service';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-ropa',
  imports: [CommonModule, NavbarComponent, ToastModule],
  templateUrl: './ropa.component.html',
  styleUrl: './ropa.component.css',
  providers: [MessageService]
})
export class RopaComponent implements OnInit {
  productos: Producto[] = [];
  ropa: Producto[] = [];
  seguridad: Producto[] = [];
  productoSeleccionado: Producto | null = null;
  cantidad = 0;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.obtenerRopa();
  }

  obtenerRopa() {
    this.productoService.getProductos().subscribe(response => {
      this.productos = response.productos;

      this.ropa = this.productos.filter(producto => producto.categoria_id === 28);
      this.seguridad = this.productos.filter(producto => producto.categoria_id === 29);

      this.ropa.forEach((producto: any) => {
        producto.imagenes = typeof producto.imagen_url === 'string' ? [producto.imagen_url] : producto.imagen_url;
      });
      this.seguridad.forEach((producto: any) => {
        producto.imagenes = typeof producto.imagen_url === 'string' ? [producto.imagen_url] : producto.imagen_url;
      });
    });
  }

  verMas(producto: Producto) {
    this.productoSeleccionado = producto;
  }

  cerrarModal() {
    this.productoSeleccionado = null;
  }

  agregarAlCarrito() {
    if (this.productoSeleccionado) {
      const bandera = this.validarCantidad();

      if (bandera) {
        const txtCantidad = document.getElementById("txtCantidad");
        const cantidad = parseInt((<HTMLInputElement>txtCantidad).value);

        const email = sessionStorage.getItem("email");

        if (!email) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Acceso requerido',
            detail: 'Debes iniciar sesión para agregar productos al carrito',
            life: 3000
          });
          return;
        }

        const carritoItem = {
          usuario_email: email,
          producto_id: parseInt(this.productoSeleccionado.id!),
          cantidad: cantidad
        };
    
        this.carritoService.addCarrito(carritoItem).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Producto agregado al carrito',
              life: 3000
            });
            this.cerrarModal();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo agregar el producto al carrito',
              life: 3000
            });
          }
        });
      }
    }
  }

  validarCantidad(): boolean {
    const cantidad = document.getElementById("txtCantidad");

    if (cantidad) {
      const cant = parseInt((<HTMLInputElement>cantidad).value);
      if (cant <= 0 || isNaN(cant)) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cantidad inválida',
          detail: 'Ingresa una cantidad mayor a cero',
          life: 3000
        });
        return false;
      }
      return true;
    }
    return false;
  }
}