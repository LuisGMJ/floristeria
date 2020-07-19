import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutUs = '"Somos un negocio con más de 20 años de experiencia, con nosotros encontrarás lo mejor en diseño floral, ven y conoce nuestro trabajo."';
  missions = [
    'Ofrecer el mejor producto con el respaldo de  nuestros proveedores.',
    'Ofrecer a la sociedad los mejores productos al mejor precio.',
    'Ofrecer las mejores condiciones de trabajo para nuestro personal.',
    'Esforzarnos al máximo para ofrecer el mejor servicio del mercado.'];
  ethicalValues = [
    { name: 'Experiencia', description: 'De más de 20 años en el diseño floral de alta calidad. Contamos con los mejores floristas de México.' },
    { name: 'Confiabilidad', description: 'De tener a tu alcance el más completo servicio de entrega. Solo nosotros contamos con el mejor personal, equipo y tecnología.' },
    { name: 'Garantía de imagen', description: 'Pues nuestro compromiso es enviar tu arreglo tal y como lo viste en internet.' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
