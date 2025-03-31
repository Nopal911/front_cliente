import { Component } from '@angular/core';
import { ContactoService } from '../../servicios/contacto.service';
import { Contacto } from '../../interfaces/contacto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-contacto',
  imports: [CommonModule, FormsModule,NavbarComponent], 
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  isModalOpen: boolean = false; 
  contacto: Contacto = { correo: '', comentario: '' }; 

  constructor(private contactoService: ContactoService) {}

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  submitComment(): void {
    if (!this.contacto.correo || !this.contacto.comentario) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    this.contactoService.addContacto(this.contacto).subscribe(
      response => {
        console.log('Comentario enviado:', response);
        alert('Comentario enviado correctamente, te contactaremos lo antes posible');
        this.contacto = { correo: '', comentario: '' }; 
        this.closeModal();
      },
      error => {
        console.error('Error al enviar comentario:', error);
        alert('Hubo un error al enviar el comentario.');
      }
    );
  }
}
