import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { ProductoListaComponent } from './componentes/producto-lista/producto-lista.component';
import { authGuard } from './guardias/guard.guard';
import { ProductosComponent } from './componentes/productos/productos.component';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { UsuariosComponent } from './componentes/users/users.component';
import { OrdenesComponent } from './componentes/ordenes/ordenes.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { DetalleOrdenComponent } from './componentes/detalle-orden/detalle-orden.component';
import { ToolbarBasicDemo } from './componentes/toolbar/toolbar.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CascosComponent } from './componentes/cascos/cascos.component';
import { LucesComponent } from './componentes/luces/luces.component';
import { RopaComponent } from './componentes/ropa/ropa.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { CrudcontactoComponent } from './componentes/crudcontacto/crudcontacto.component';
import { CarritouserComponent } from './componentes/carritouser/carritouser.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'register',
        component: RegisterComponent
    },

    {
        path: 'productlist',
        component: ProductoListaComponent,
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    
    {
        path: 'productos',
        component: ProductosComponent,
        canActivate: [authGuard]
    },
    
    {
        path: 'categorias',
        component: CategoriasComponent,
        canActivate: [authGuard]
    },

    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [authGuard]
    },

    {
        path: 'ordenes',
        component: OrdenesComponent,
        canActivate: [authGuard]
    },
    {
        path: 'carrito',
        component: CarritoComponent,
        canActivate: [authGuard]
    },
    {
        path: 'detalleorden',
        component: DetalleOrdenComponent,
        canActivate: [authGuard]
    },
    {
        path: 'inicio',
        component: InicioComponent,
        canActivate: [authGuard]
    },
    {
        path: 'cascos',
        component: CascosComponent,
        canActivate: [authGuard]
    },
    {
        path: 'luces',
        component: LucesComponent,
        canActivate: [authGuard]
    },
    {
        path: 'ropa',
        component: RopaComponent,
        canActivate: [authGuard]
    },
    {
        path: 'contacto',
        component: ContactoComponent
    },
    {
        path: 'crudcontacto',
        component: CrudcontactoComponent
    },
    {
        path: 'carritouser',
        component: CarritouserComponent
    }
    
];
