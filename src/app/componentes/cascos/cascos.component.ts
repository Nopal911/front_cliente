import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/product.service';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { OrdenService } from '../../servicios/orden.service';

@Component({
  selector: 'app-cascos',
  templateUrl: './cascos.component.html',
  styleUrls: ['./cascos.component.css'],
  imports: [CommonModule, NavbarComponent]
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
    private ordenService: OrdenService
  ) {}

  ngOnInit(): void {
    this.obtenerCascos();
  }

  obtenerCascos() {
    this.productoService.getProductos().subscribe(response => {
      this.productos = response.productos;

      // Filtrar productos con categoria_id igual a 22 o 25
      this.cascosDeportivos = this.productos.filter(producto => producto.categoria_id === 25);
      this.cascosTodoTerreno = this.productos.filter(producto => producto.categoria_id === 22);

      // Mapear imagenes
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
