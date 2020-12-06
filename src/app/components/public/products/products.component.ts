import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../../../services/pagination.service';
import { FilterModel } from '../../../models/filter.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsData;
  productTypeList;

  // Pagination
  collectionName = 'arrangement';
  noElements = 5;
  orderBy = 'views';
  filterBy: FilterModel;

  loading = false;

  constructor(private productsService: ProductsService,
              public paginationService: PaginationService,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.filterBy = null;

      this.loading = true;

      this.productsService.getProductTypeList().subscribe(list => {
        console.log(list);
        let id;

        this.loading = false;

        for (let i = 0; i < list.type.length; i++) {
          const element = list.type[i];

          if (element['url-name'] === params.get('id')) {
            id = i.toString();
            this.filterBy = {
              type: 'type',
              value: id
            };
          }
        }

      }, err => {
        this.loading = false;
        console.error('Error inesperado: ', err);
      });
    });
  }

}
