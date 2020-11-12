import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationService } from '../../../services/pagination.service';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-flip-book',
  templateUrl: './flip-book.component.html',
  styleUrls: ['./flip-book.component.css']
})
export class FlipBookComponent implements OnInit {

  @Input() productsData = {};

  constructor(private productsService: ProductsService,
              private router: Router) { }

  ngOnInit(): void { }

  showDetails(product: Product) {
    this.router.navigate(['producto', product.id, 'detalles']);

    const views = product.views + 1;
    this.productsService.updateViews(product.id, views);
  }

}
