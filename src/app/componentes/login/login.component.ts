import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModprimengModule } from '../../modprimeng.module';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { MessageService } from 'primeng/api';
import { User } from '../../interfaces/user';
import { Mensaje } from '../../interfaces/Mensaje';
import { ToolbarBasicDemo } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ModprimengModule, RouterModule, CommonModule, ToolbarBasicDemo],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForma: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private messageService: MessageService, private router: Router) {
    this.loginForma = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)
      ]]
    });
  }

  get email() {
    return this.loginForma.controls['email'];
  }

  get password() {
    return this.loginForma.controls['password'];
  }

  login() {
    const { email, password } = this.loginForma.value;
    const usuario: User = {
      id: "1",
      full_name: "",
      email: email,
      password: password
    };

    this.authService.getUserByEmail(usuario as User).subscribe(
      (response) => {
        console.log(response);
        let mensaje: Mensaje = response;
        console.log("Respuesta ", mensaje.message);

        if (mensaje.respuesta === 1) {
          // Si la autenticación es exitosa, guarda el email en sessionStorage
          sessionStorage.setItem('email', email as string);

          // Muestra un mensaje de éxito
          this.messageService.add({ severity: 'success', summary: 'Success', detail: mensaje.message });

          // Redirige a la ruta de usuarios
          this.router.navigate(['/inicio']);
        } else {
          // Si las credenciales son incorrectas, muestra un mensaje de error
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email o Contraseña Incorrecta' });
        }
      },
      (error) => {
        // Si hay un error en la solicitud, muestra un mensaje de error
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email o Contraseña Incorrecta' });
      }
    );
  }
}
