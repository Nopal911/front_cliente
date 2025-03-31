import { Component, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';
@Component({
  selector: 'app-inicio',
  imports: [CardModule, ButtonModule, PanelModule, RouterModule,CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Esto mantiene los estilos encapsulados
})
export class InicioComponent {
  categorias = [
    {
      title: 'Cascos',
      description: 'Nuestros cascos de alta calidad están diseñados para ofrecer máxima protección en todo tipo de actividades, desde deportes hasta trabajo en condiciones extremas.',
      image: '/cascosmoto.jpg',
      route: '/cascos' 
    },
    {
      title: 'Luces y electrónica',
      description: 'Nuestra línea de ropa especializada está pensada para adaptarse a tus necesidades, proporcionando durabilidad, protección y un ajuste perfecto. Con materiales de alta resistencia, te aseguramos un rendimiento superior en cada actividad.',
      image: '/lucesmoto.jpg',
      route: '/luces'
    },
    {
      title: 'Ropa y seguridad',
      description: 'Desde iluminación LED hasta tecnología avanzada, ofrecemos soluciones innovadoras que se adaptan a tu estilo de vida y necesidades. Descubre lo último en gadgets y dispositivos electrónicos para facilitar tu día a día.',
      image: '/ropamoto.jpg',
      route: '/ropa'
    }
  ];
}
