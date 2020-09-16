import { Component, OnInit, TemplateRef } from '@angular/core';
import { ImageService } from '../../../services/image.service';
import { PaginationService } from '../../../services/pagination.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  imageForm: FormGroup;

  images: any;

  // Pagination
  collectionName = 'image-list';
  noElements = 10;
  orderBy = 'name';

  showPagination = true;

  selectedImage: any;

  modalRef: BsModalRef;

  constructor(private imageService: ImageService,
              private fb: FormBuilder,
              public paginationService: PaginationService,
              private modalService: BsModalService,
              private router: Router) {

    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.imageForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(200)]],
      filePath: [''],
      url: ['']
    });
  }

  openModal(template: TemplateRef<any>, image: any) {
    this.selectedImage = image;

    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
  }

  updateImage(id: string) {
    this.router.navigate(['admin/galeria/editar', id]);
  }

  deleteImage() {
    this.imageService.deleteImage(this.selectedImage);
  }

}
