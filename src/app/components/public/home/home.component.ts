import { Component, OnInit } from '@angular/core';
import { CarouselService } from '../../../services/carousel.service';
import { PaginationService } from '../../../services/pagination.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  titleflipbook = 'Arreglos destacados';

  carouselData = {};

  // Pagination
  collectionName = 'arrangement';
  noElements = 5;
  orderBy = 'views';

  loading = false;


  constructor(private carouselService: CarouselService,
              public paginationService: PaginationService) {}

  ngOnInit(): void {
    this.getData();
  }
  
  getData() {
    this.loading = true;
    this.carouselService.getCarouselData().subscribe(data => {
      this.loading = false;
      this.carouselData = data;
    }, err => {
      this.loading = false;
      console.error('Error inesperado', err);
    });
  }

}
