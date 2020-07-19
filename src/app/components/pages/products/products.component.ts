import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsData;
  productTypeList;

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productsService.getProductTypeList().subscribe(list => {
        let id;

        for (let i = 0; i < list.type.length; i++) {
          const element = list.type[i];

          if (element['url-name'] === params.id) {
              id = i.toString();
          }
        }

        this.productsService.getProductsByType(id).subscribe(products => this.productsData = products);
      });
    });
  }

}
