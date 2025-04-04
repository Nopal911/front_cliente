import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/product.service';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { OrdenService } from '../../servicios/orden.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-cascos',
  templateUrl: './cascos.component.html',
  styleUrls: ['./cascos.component.css'],
  imports: [CommonModule, NavbarComponent, ToastModule],
  providers: [MessageService]
})
export class CascosComponent implements OnInit {
  productos: Producto[] = [];
  cascosDeportivos: Producto[] = [];
  cascosTodoTerreno: Producto[] = [];
  productoSeleccionado: Producto | null = null;
  cantidad = 0;
 
  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private ordenService: OrdenService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.obtenerCascos();
  }

  obtenerCascos() {
    this.productoService.getProductos().subscribe(response => {
      this.productos = response.productos;

      this.cascosDeportivos = this.productos.filter(producto => producto.categoria_id === 25);
      this.cascosTodoTerreno = this.productos.filter(producto => producto.categoria_id === 22);

      this.cascosDeportivos.forEach((producto: any) => {
        producto.imagenes = typeof producto.imagen_url === 'string' ? [producto.imagen_url] : producto.imagen_url;
      });
      this.cascosTodoTerreno.forEach((producto: any) => {
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