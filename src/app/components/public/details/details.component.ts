import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  product: any;

  loading = false;

  showModal = false;

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loading = true;

    this.route.params.subscribe((params: any) => {
      this.productsService.getProduct(params.id).subscribe(product => {
        this.loading = false;
        this.product = product;
      }, err => {
        this.loading = false;
        console.error(err);
      });
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
