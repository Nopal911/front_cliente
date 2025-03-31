import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModprimengModule } from '../../modprimeng.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // Necesario para *ngIf y otras directivas comunes
import { passwordMatchValidator } from '../../shared/password-match.directives';
import { AuthService } from '../../servicios/auth.service';
import { MessageService } from 'primeng/api';
import { User } from '../../interfaces/user';
import { ToolbarBasicDemo } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ModprimengModule, RouterModule, CommonModule,ToolbarBasicDemo],  // Importamos CommonModule para *ngIf
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registroForma: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private messageService: MessageService, private router:Router ) {
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
    }, { validators: passwordMatchValidator});
  }

  passwordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get full_name() {
    return this.registroForma.controls['nombre'];
  }

  get email() {
    return this.registroForma.controls['email'];
  }

  get password() {
    return this.registroForma.controls['password'];
  }

  get confirmPassword() {
    return this.registroForma.controls['confirmPassword'];
  }

  enviarRegistro() {
    const data = {...this.registroForma.value};
    console.log('Datos: ', data)
    delete data.confirmPassword;
    data.id = "1"

    this.authService.registroUsuario(data as User).subscribe(
      response => {
        console.log(response)
        this.messageService.add({severity:'success', summary: 'success',
          detail: 'Registro Agregado con éxito'
        })
      },
      error => console.log(error) //me quede en este paso, pagina 52
    )
   }
}
