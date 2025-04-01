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
  cantidad = 0;

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
      var bandera = this.validarCantidad();

      var cantidad = 0;
      if (bandera) {
        var txtCantidad = document.getElementById("txtCantidad");
        cantidad = parseInt((<HTMLInputElement>txtCantidad).value);


        // Se obtiene la sesion
        let email = sessionStorage.getItem("email");

        const carritoItem = {
          usuario_email: email!,
          producto_id: parseInt(this.productoSeleccionado.id!), // Convertir a número
          cantidad: cantidad
        };
    
        this.carritoService.addCarrito(carritoItem).subscribe(response => {
          alert('Producto agregado al carrito');
          this.cerrarModal();
        });
      }

      
      
    }
  }

  validarCantidad() {
    var bandera = true;
    var cantidad = document.getElementById("txtCantidad");

    if (cantidad) {
      let cant = parseInt((<HTMLInputElement>cantidad).value);
      if (cant <= 0 || isNaN(cant)) {
        alert("Ingresa una cantidad mayor a cero");
        bandera = false;
      }
    } else {
      bandera = false;
    }

    return bandera;
  }
  
  
  
}
