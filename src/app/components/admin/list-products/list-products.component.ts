import { Component, OnInit, TemplateRef } from '@angular/core';
import { PaginationService } from '../../../services/pagination.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  // Pagination
  collectionName = 'arrangement';
  noElements = 5;
  orderBy = 'views';

  modalRef: BsModalRef;

  product: any;

  constructor(public paginationService: PaginationService,
              private modalService: BsModalService,
              private productsService: ProductsService,
              private router: Router) {}


  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>, product: any) {
    this.product = product;

    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
  }

  editProduct(id: string) {
    this.router.navigate(['admin/editar', id]);
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id);
  }

}
