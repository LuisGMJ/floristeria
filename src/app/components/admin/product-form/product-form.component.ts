import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageService } from '../../../services/image.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../../../services/pagination.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  isNewForm: boolean;

  productForm: FormGroup;

  imageList;

  types = [];

  private cargarComponentes = true;

  // modal
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private productsService: ProductsService,
              private imageService: ImageService,
              private route: ActivatedRoute,
              public pagination: PaginationService) {
    this.imageList = [];

    this.createForm();
  }

  
  ngOnInit(): void {
    this.productsService.getProductTypeList().subscribe(list => this.types = list.type);

    this.route.params.subscribe((params) => {
      if (!params.id) {
        this.isNewForm = true;
        return;
      }

      this.isNewForm = false;
      this.loadProduct(params.id);
    });
  }

  ngOnDestroy(): void {
    this.imageService.uploadPercent = undefined;
  }


  get invalidTitle() {
    return this.productForm.get('title').invalid && this.productForm.get('title').touched;
  }
  get invalidDescription() {
    return this.productForm.get('description').invalid && this.productForm.get('description').touched;
  }
  get invalidComponents() {
    return this.productForm.get('maincomponents').invalid && this.productForm.get('maincomponents').touched;
  }
  get invalidPrice() {
    return this.productForm.get('price').invalid && this.productForm.get('price').touched;
  }
  get invalidSize() {
    return this.productForm.get('size').invalid && this.productForm.get('size').touched;
  }
  get invalidType() {
    return this.productForm.get('type').invalid && this.productForm.get('type').touched;
  }

  get invalidImage() {
    return this.productForm.get('image').invalid && this.productForm.get('image').touched;
  }

  get maincomponents() {
    return this.productForm.get('maincomponents') as FormArray;
  }

  createForm() {
    this.productForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.maxLength(600)]],
      image: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(200)]],
      maincomponents: this.fb.array([]),
      price: [0, [Validators.required, Validators.min(1), Validators.maxLength(7)]],
      size: ['', [Validators.required], , Validators.maxLength(100)],
      type: ['', [Validators.required, Validators.maxLength(2)]],
      views: [0]
    });
  }

  addImageToForm(imageName: string) {
    if (!imageName) {
      return;
    }
    this.productForm.get('image').setValue(imageName);
  }

  addComponent() {
    this.maincomponents.push(this.fb.control('', [Validators.required, Validators.maxLength(200)]));
  }

  deleteComponent(i: number) {
    this.maincomponents.removeAt(i);
  }

  listImages() {
    /* this.imageService.getImages().subscribe(images => this.imageList = images.map(image => image)); */
    this.pagination.init('image-list', 'name', { reverse: false, prepend: false });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
  }

  changeType(e) {
    const index = e.target.value;

    console.log(e.target.value);
    console.log(typeof index);

    this.productForm.get('type').setValue(index, {
      onlySelf: true
    });
  }

  loadProduct(id: string) {
    return this.productsService.getProduct(id).subscribe(data => {
      const product = data[0];

      this.productForm.get('title').setValue(product.title);
      this.productForm.get('description').setValue(product.description);
      this.productForm.get('id').setValue(product.id);
      this.productForm.get('image').setValue(product.image);
      this.productForm.get('price').setValue(product.price);
      this.productForm.get('size').setValue(product.size);
      this.productForm.get('type').setValue(product.type);
      this.productForm.get('views').setValue(product.views);

      if (product.maincomponents && this.cargarComponentes) {
        // Por cada componente en el arreglo maincomponents agrego un FormBuilder control con su valor
        product.maincomponents.map((component: string) => this.maincomponents.push(this.fb.control(component, Validators.required)));
      }
    }, (error) => {
      this.toastr.error('Error inesperado al cargar los componentes principales  ');
      console.error(error);
    });
  }

  guardar() {
    this.cargarComponentes = false;

    if (!this.productForm.valid) {
      this.productForm.markAllAsTouched();
    } else {
      if (this.productForm.get('id').value === '') {
        this.productsService.addProduct(this.productForm.value);
      } else {
        this.productsService.updateProduct(this.productForm.value);
      }
    }
  }

}
