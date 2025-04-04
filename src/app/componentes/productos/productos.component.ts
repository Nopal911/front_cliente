import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/product.service';
import { Producto } from '../../interfaces/producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-productos',
  imports: [CardModule, ReactiveFormsModule, TableModule, ButtonModule, NavbarComponent, DropdownModule,CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productoForm: FormGroup;
  productoEdicion: Producto | null = null;
  selectedFile: File | null = null;

  // Opciones de tallas
  tallasDisponibles = [
    { label: 'CH', value: 'CH' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
    { label: 'Único', value: 'Único' }
  ];

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      categoria_id: ['', Validators.required],
      color: [''],
      talla: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto eliminado correctamente.' });
          this.obtenerProductos();
        },
        () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el producto.' });
        }
      );
    }
  }

  editarProducto(producto: Producto): void {
    this.productoEdicion = { ...producto };
    this.productoForm.patchValue({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      categoria_id: producto.categoria_id,
      color: producto.color,
      talla: producto.talla,
    });
  }

  // Función para cancelar la edición
  cancelarEdicion(): void {
    this.productoEdicion = null;
    this.productoForm.reset();
    this.selectedFile = null;
  }
  
  agregarProducto(): void {
    if (this.productoForm.invalid) {
      return;
    }
  
    const producto: Producto = this.productoForm.value;
    const formData = new FormData();
  
    formData.append('nombre', producto.nombre);
    formData.append('descripcion', producto.descripcion);
    formData.append('precio', producto.precio.toString());
    formData.append('stock', producto.stock.toString());
    formData.append('categoria_id', producto.categoria_id.toString());
    formData.append('color', producto.color);
    formData.append('talla', producto.talla);
  
    if (this.selectedFile) {
      formData.append('imagen_url', this.selectedFile, this.selectedFile.name);
    }
  
    if (this.productoEdicion) {
      formData.append('id', this.productoEdicion.id || '');
  
      this.productoService.updateProducto(formData).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Producto actualizado', detail: 'El producto se actualizó correctamente.' });
          this.obtenerProductos();
          this.cancelarEdicion();
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el producto.' });
        }
      );
    } else {
      this.productoService.agregarProducto(formData).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Producto agregado', detail: 'El producto se agregó correctamente.' });
          this.obtenerProductos();
          this.productoForm.reset();
          this.selectedFile = null;
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo agregar el producto.' });
        }
      );
    }
  }

  obtenerProductos() {
    this.productoService.obtenerProductos().subscribe((response: any) => {
      this.productos = response.productos;
    });
  }
}