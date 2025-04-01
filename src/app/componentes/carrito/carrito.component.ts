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

@Component({
  selector: 'app-carrito',
  imports: [TableModule, ButtonModule, ReactiveFormsModule, CardModule, NavbarComponent],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: Carrito[] = [];
  carritoForm: FormGroup;
  carritoEdicion: Carrito | null = null;

  constructor(
    private carritoService: CarritoService,
    private fb: FormBuilder,
    private messageService: MessageService
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

  // Obtener los productos en el carrito solo del usuario en sesión
  obtenerCarrito(): void {
    let email = sessionStorage.getItem("email");
    
    if (email) {
      this.carritoService.getCarrito().subscribe(
        (response) => {
          this.carrito = response.carrito.filter((item: Carrito) => item.usuario_email === email);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los productos del carrito.' });
        }
      );
    } else {
      this.carrito = []; // Si no hay sesión, vaciar el carrito
    }
  }

  // Obtener todos los productos en el carrito
  /*obtenerCarrito(): void {
    this.carritoService.getCarrito().subscribe(
      (response) => {
        this.carrito = response.carrito;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los productos del carrito.' });
      }
    );
  }*/

  // Editar producto en el carrito (para actualizaciones)
  editarProducto(carrito: Carrito): void {
    this.carritoEdicion = { ...carrito };
    this.carritoForm.patchValue(this.carritoEdicion);
  }
}
