import { Component, OnInit } from '@angular/core';
import { UserService } from '../../servicios/user.service';
import { Usuario } from '../../interfaces/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './users.component.html',
  imports: [CommonModule, ButtonModule, CardModule, TableModule, NavbarComponent, ReactiveFormsModule],
  styleUrls: ['./users.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = { id: '', full_name: '', email: '', password: '', role: 'user' };
  editando: boolean = false;
  usuarioForm: FormGroup;
  correoExistente: boolean = false;
  contrasenaInvalida: boolean = false;

  constructor(private userService: UserService, private fb: FormBuilder, private messageService: MessageService) {
    this.usuarioForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.userService.getUsuarios().subscribe(
      data => {
        this.usuarios = data.usuarios;
      },
      error => console.error('Error al obtener usuarios', error)
    );
  }

  verificarCorreoExistente(email: string): void {
    this.userService.getUsuarios().subscribe(
      (response) => {
        const usuarioExistente = response.usuarios.some((usuario: Usuario) => usuario.email === email);
        this.correoExistente = usuarioExistente;
      },
      (error) => console.error('Error al verificar correo', error)
    );
  }

  verificarContrasenaInvalida(password: string): void {
    const contrasenasNoPermitidas = ['123456', 'password', '123123']; // Agrega más contraseñas no permitidas aquí
    this.contrasenaInvalida = contrasenasNoPermitidas.includes(password);
  }

  agregarUsuario(): void {
    if (this.usuarioForm.invalid || this.correoExistente || this.contrasenaInvalida) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, verifica los datos ingresados.' });
      return;
    }

    this.userService.addUsuario(this.nuevoUsuario).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario agregado correctamente.' });
        this.obtenerUsuarios();
        this.nuevoUsuario = { id: '', full_name: '', email: '', password: '', role: 'user' };
        this.usuarioForm.reset();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar usuario: ' + error.message });
      }
    );
  }

  editarUsuario(usuario: Usuario): void {
    this.nuevoUsuario = { ...usuario };
    this.editando = true;
    this.usuarioForm.patchValue(usuario);
    // Desactivar campos de nombre y correo al editar
    this.usuarioForm.get('full_name')?.disable();
    this.usuarioForm.get('email')?.disable();
  }

  // Función para habilitar los campos al salir del modo edición
  salirEdicion(): void {
    this.editando = false;
    this.usuarioForm.reset();
    // Habilitar los campos de nombre y correo
    this.usuarioForm.get('full_name')?.enable();
    this.usuarioForm.get('email')?.enable();
  }

  actualizarUsuario(): void {
    if (this.usuarioForm.invalid || this.correoExistente || this.contrasenaInvalida) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, verifica los datos ingresados.' });
      return;
    }

    this.userService.updateUsuario(this.nuevoUsuario).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado correctamente.' });
        this.obtenerUsuarios();
        this.nuevoUsuario = { id: '', full_name: '', email: '', password: '', role: 'user' };
        this.editando = false;
        this.usuarioForm.reset();
        
        // Desbloquear los campos de nombre y correo después de la actualización
        this.usuarioForm.get('full_name')?.enable();
        this.usuarioForm.get('email')?.enable();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar usuario: ' + error.message });
      }
    );
  }

  eliminarUsuario(email: string): void {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.userService.deleteUsuario(email).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario eliminado correctamente.' });
          this.obtenerUsuarios();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar usuario: ' + error.message });
        }
      );
    }
  }
}
