import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/product.service';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-luces',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './ropa.component.html',
  styleUrl: './ropa.component.css'
})
export class RopaComponent implements OnInit {
  productos: Producto[] = [];
  ropa: Producto[] = [];
  seguridad: Producto[] = [];
  productoSeleccionado: Producto | null = null;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.obtenerRopa();
  }

  obtenerRopa() {
    this.productoService.getProductos().subscribe(response => {
      this.productos = response.productos;

      // Filtrar productos con categoria_id igual a 22 o 25
      this.ropa = this.productos.filter(producto => producto.categoria_id === 28);
      this.seguridad = this.productos.filter(producto => producto.categoria_id === 29);

      // Mapear imagenes
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
      const carritoItem = {
        usuario_email: "correo@example.com",
        producto_id: this.productoSeleccionado.id ? Number(this.productoSeleccionado.id) : undefined, // Convertir a número
        cantidad: 1
      };
  
      this.carritoService.addCarrito(carritoItem).subscribe(response => {
        alert('Producto agregado al carrito');
        this.cerrarModal();
      });
    }
  }
  
  
}
