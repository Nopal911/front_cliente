import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { Carrito } from '../../interfaces/carrito';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { NavbarComponent } from '../navbar/navbar.component';
import { OrdenService } from '../../servicios/orden.service';
import { ProductoService } from '../../servicios/product.service';
import { Producto } from '../../interfaces/producto';
import { CarritoUser } from '../../interfaces/carrito.user';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [TableModule, ButtonModule, ReactiveFormsModule, CardModule, NavbarComponent, CurrencyPipe],
  templateUrl: './carritouser.component.html',
  styleUrls: ['./carritouser.component.css']
})
export class CarritouserComponent implements OnInit {
  producto: Producto[] = [];
  carrito: CarritoUser[] = [];
  carritoForm: FormGroup;
  carritoEdicion: Carrito | null = null;

  constructor(
    private carritoService: CarritoService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private ordenService: OrdenService,
    private productoService: ProductoService
  ) {
    this.carritoForm = this.fb.group({
      usuario_email: ['', Validators.required],
      producto_id: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  obtenerCarrito(): void {
    let email = sessionStorage.getItem("email");
    
    if (email) {
      this.carritoService.getCarritoDetalle(email).subscribe(
        (response) => {
          this.carrito = response.carrito;
          console.log(this.carrito);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los productos del carrito.' });
        }
      );
    } else {
      this.carrito = [];
    }
  }

  obtenerProducto(): void {
    let email = sessionStorage.getItem("email");
    
    if (email) {
      this.productoService.getProductos().subscribe(
        (response) => {
          this.producto = response.producto.filter((item: Producto) => item.usuario_email === email);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los productos del carrito.' });
        }
      );
    } else {
      this.carrito = [];
    }
  }

  agregarOrden() {
    let email = sessionStorage.getItem("email");
    
    if (email) {
      this.carritoService.getCarrito().subscribe(
        (response) => {
          const carritoUsuario = response.carrito.filter((item: Carrito) => item.usuario_email === email);

          this.productoService.getProductos().subscribe(
            (productosResponse: any) => {
              const productos = Array.isArray(productosResponse) ? productosResponse : 
                              (productosResponse.productos || productosResponse.data || []);
              
              let total = 0;

              carritoUsuario.forEach((item: Carrito) => {
                const producto = productos.find((prod: any) => prod.id === item.producto_id);
                if (producto) {
                  total += producto.precio * item.cantidad;
                }
              });

              const ordenItem = {
                usuario_email: email!,
                total: total,
                estado: "pendiente" as "pendiente" | "pagado" | "enviado" | "entregado"
              };

              this.ordenService.addOrden(ordenItem).subscribe(
                (ordenResponse) => {
                  // Eliminar todos los productos del carrito después de crear la orden
                  this.eliminarProductosDelCarrito(carritoUsuario);
                  this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Orden agregada correctamente' });
                },
                (error) => {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No hay nada en el carrito.' });
                }
              );
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron obtener los productos.' });
            }
          );
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el carrito del usuario.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No hay sesión activa.' });
    }
  }

  private eliminarProductosDelCarrito(carritoItems: Carrito[]): void {
    let eliminacionesCompletadas = 0;
    
    carritoItems.forEach((item) => {
      if (item.id) { // Asegurarse de que el item tiene un ID
        this.carritoService.deleteCarrito(item.id).subscribe(
          () => {
            eliminacionesCompletadas++;
            
            // Cuando todas las eliminaciones estén completas, actualizar la vista
            if (eliminacionesCompletadas === carritoItems.length) {
              this.obtenerCarrito(); // Refrescar la lista del carrito
              
            }
          },
          (error) => {
            console.error('Error al eliminar producto del carrito:', error);
            eliminacionesCompletadas++;
          }
        );
      } else {
        eliminacionesCompletadas++; // Si no tiene ID, contar como completado
      }
    });
  }
}