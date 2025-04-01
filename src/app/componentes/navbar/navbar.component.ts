import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { CarritoService } from '../../servicios/carrito.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, InputTextModule, Toolbar, MenubarModule,OverlayPanelModule,CommonModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  carritoItems: any[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.items = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/inicio' },
      { label: 'Productos', icon: 'pi pi-box', routerLink: '/productos' },
      { label: 'Categorías', icon: 'pi pi-tags', routerLink: '/categorias' },
      { label: 'Usuarios', icon: 'pi pi-users', routerLink: '/usuarios' },
      { label: 'Órdenes', icon: 'pi pi-shopping-cart', routerLink: '/ordenes' },
      { label: 'Carrito', icon: 'pi pi-shopping-bag', routerLink: '/carrito' },
      { label: 'Detalle Orden', icon: 'pi pi-list', routerLink: '/detalleorden' },
      { label: 'Contacto', icon:'pi pi-phone', routerLink: '/contacto'},
      { label: 'crud contacto', icon: "pi pi-phone", routerLink: '/crudcontacto'},
      { label: 'carrito-user', icon: 'pi pi-shopping-cart', routerLink:'/carritouser'},
      {
        label: 'Cuenta',
        icon: 'pi pi-user',
        items: [
          { label: 'Salir', icon: 'pi pi-sign-in', routerLink: '/login' },
        ]
      },
      {
        label: 'Catalogo',
        icon: 'pi pi-book',
        items: [
          { label: 'Cascos', icon: 'pi pi-gauge', routerLink: '/cascos' },
          { label: 'Luces', icon:'pi pi-lightbulb', routerLink:'/luces'},
          { label: 'Ropa y seguridad', icon:'pi pi-shield', routerLink: '/ropa'}
        ]
      }
    ];

    this.obtenerCarrito();
  }

  toggleCarrito() {
    // Toggle for carrito dropdown (using overlay panel)
  }

  obtenerCarrito() {
    this.carritoService.getCarrito().subscribe(response => {
      this.carritoItems = response;
    });
  }
}
