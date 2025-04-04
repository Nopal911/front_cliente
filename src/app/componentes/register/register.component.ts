import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { MessageService } from 'primeng/api';
import { User } from '../../interfaces/user';
import { passwordMatchValidator } from '../../shared/password-match.directives';
import { CardModule } from 'primeng/card';
import { ToolbarBasicDemo } from '../toolbar/toolbar.component';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [CardModule,ToolbarBasicDemo,ButtonModule,ReactiveFormsModule,CommonModule],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registroForma: FormGroup;
  showModal: boolean = false;  // Variable para controlar la visibilidad del modal

  constructor(private fb: FormBuilder, private authService: AuthService, private messageService: MessageService, private router: Router) {
    this.registroForma = this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('.*[a-z].*'), // Al menos una letra minúscula
        Validators.pattern('.*[A-Z].*'), // Al menos una letra mayúscula
        Validators.pattern('.*[!@#$%^&*(),.?":{}|<>].*') // Al menos un carácter especial
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  }

  onSubmit() {
    // Mostrar modal de términos y condiciones
    if (this.registroForma.valid) {
      this.showModal = true; // Mostrar el modal
    }
  }

  aceptarTerminos() {
    const data = { ...this.registroForma.value };
    delete data.confirmPassword;  // Eliminar confirmPassword antes de enviar
    data.id = "1";  // Solo un ejemplo de asignación de ID

    this.authService.registroUsuario(data as User).subscribe(
      response => {
        console.log(response);
        this.messageService.add({
          severity: 'success', 
          summary: 'Éxito',
          detail: 'Registro Agregado con éxito'
        });
        this.router.navigate(['/login']);  // Redirigir al login
      },
      error => {
        console.log(error);
        this.messageService.add({
          severity: 'error', 
          summary: 'Error',
          detail: 'Hubo un problema al registrar el usuario.'
        });
      }
    );
    this.showModal = false; // Ocultar modal después de aceptar
  }

  cancelarTerminos() {
    this.showModal = false;  // Solo cerrar el modal
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'El usuario no se creó.'
    });
    this.router.navigate(['/login']);  // Redirigir al login
  }
}
