import { Component, OnInit, TemplateRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PaginationService } from '../../../services/pagination.service';

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.css']
})
export class GalleryModalComponent implements OnInit, OnDestroy {
  
  @Output() imageUrl: EventEmitter<any>;
  
  modalRef: BsModalRef;

  private modalConfig = {
    ignoreBackdropClick: true,
    keyboard: false
  };

  private paginationConfig = {
    limit: 6,
    reverse: false,
    prepend: false
  };


  constructor(public pagination: PaginationService,
              private modalService: BsModalService) { 
    this.imageUrl = new EventEmitter();

    this.pagination.init('image-list', 'name', this.paginationConfig);
  }
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.pagination.reset();

    this.pagination.datas = null;
  }

  reset(): void {
    this.pagination.reset();

    this.pagination.init('image-list', 'name', this.paginationConfig);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign(this.modalConfig, { class: 'gray modal-lg' }));
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.pagination.more();
    }
  }

  emitImageUrl(url: string) {
    this.imageUrl.emit(url);
    this.reset();
  }

}
