import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  titleCarousel = 'Encuentra los mejores arreglos florales aqui';
  itemsPerSlide = 2;

  @Input() carouselData = {};

  constructor() { }

  ngOnInit(): void {
  }

}
