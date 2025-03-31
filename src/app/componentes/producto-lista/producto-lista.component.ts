import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-producto-lista',
  imports: [ButtonModule],
  templateUrl: './producto-lista.component.html',
  styleUrl: './producto-lista.component.css'
})
export class ProductoListaComponent {
  constructor(private router: Router) {}

  logOut() {
    sessionStorage.clear()
    this.router.navigate(['login'])
  }
}
