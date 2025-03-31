import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
    standalone: true,
    imports: [Toolbar, ButtonModule, SplitButton, InputTextModule]
})
export class ToolbarBasicDemo implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
                { label: 'Ingresar', icon: 'pi pi-sign-in', routerLink: '/login' },
                { label: 'Registrar', icon: 'pi pi-user-plus', routerLink: '/register' }
        ];
    }
}