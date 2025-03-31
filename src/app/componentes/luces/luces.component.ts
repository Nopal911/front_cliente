import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/product.service';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-luces',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './luces.component.html',
  styleUrl: './luces.component.css'
})
export class LucesComponent implements OnInit {
  productos: Producto[] = [];
  luces: Producto[] = [];
  electronica: Producto[] = [];
  productoSeleccionado: Producto | null = null;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService
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
