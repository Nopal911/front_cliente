import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/product.service';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-luces',
  imports: [CommonModule, NavbarComponent, ToastModule],
  templateUrl: './luces.component.html',
  styleUrl: './luces.component.css',
  providers: [MessageService]
})
export class LucesComponent implements OnInit {
  productos: Producto[] = [];
  luces: Producto[] = [];
  electronica: Producto[] = [];
  productoSeleccionado: Producto | null = null;
  cantidad = 0;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.obtenerLuces();
  }

  obtenerLuces() {
    this.productoService.getProductos().subscribe(response => {
      this.productos = response.productos;

      // Filtrar productos con categoria_id igual a 22 o 25
      this.luces = this.productos.filter(producto => producto.categoria_id === 26);
      this.electronica = this.productos.filter(producto => producto.categoria_id === 27);

      // Mapear imagenes
      this.luces.forEach((producto: any) => {
        producto.imagenes = typeof producto.imagen_url === 'string' ? [producto.imagen_url] : producto.imagen_url;
      });
      this.electronica.forEach((producto: any) => {
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

        // Se obtiene la sesion
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