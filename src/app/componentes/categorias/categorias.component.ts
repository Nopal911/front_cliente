import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../servicios/categoria.service';
import { Categoria } from '../../interfaces/categoria';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common'; 
import { NavbarComponent } from '../navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-categorias',
  imports: [ReactiveFormsModule,CommonModule,NavbarComponent,ButtonModule,TableModule,CardModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriaForm: FormGroup;
  categoriaEdicion: Categoria | null = null;

  constructor(
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (response) => {
        this.categorias = response.categorias;
      },
      () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las categorías.' });
      }
    );
  }

  agregarCategoria(): void {
    if (this.categoriaForm.invalid) return;
    
    const categoria: Categoria = this.categoriaForm.value;

    if (this.categoriaEdicion) {
      categoria.id = this.categoriaEdicion.id;
      this.categoriaService.updateCategoria(categoria).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categoría actualizada.' });
          this.obtenerCategorias();
          this.cancelarEdicion();
        },
        () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la categoría.' });
        }
      );
    } else {
      this.categoriaService.addCategoria(categoria).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categoría agregada.' });
          this.obtenerCategorias();
          this.categoriaForm.reset();
        },
        () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo agregar la categoría.' });
        }
      );
    }
  }

  editarCategoria(categoria: Categoria): void {
    this.categoriaEdicion = categoria;
    this.categoriaForm.patchValue(categoria);
  }

  cancelarEdicion(): void {
    this.categoriaEdicion = null;
    this.categoriaForm.reset();
  }

  /*eliminarCategoria(id: number): void {
    this.categoriaService.deleteCategoria(id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categoría eliminada.' });
        this.obtenerCategorias();
      },
      () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la categoría.' });
      }
    );
  }*/

    eliminarCategoria(id: string | undefined): void {
      if (!id) {
        console.error('ID no válido para eliminar categoría');
        return;
      }
    
      const idNumero = Number(id); // Convertimos el ID a número
      if (isNaN(idNumero)) {
        console.error('ID no es un número válido');
        return;
      }
    
      // Llamamos al servicio para eliminar la categoría
      this.categoriaService.deleteCategoria(idNumero).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categoría eliminada correctamente.' });
          this.obtenerCategorias(); // Volvemos a cargar las categorías
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la categoría.' });
        }
      );
    }
    
    
}

