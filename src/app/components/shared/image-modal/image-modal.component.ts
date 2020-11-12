import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {

  @ViewChild('childModal', { static: false }) childModal: ModalDirective;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showChildModal();
    }, 100);
  }

  showChildModal(): void {
    this.childModal.show();
  }
 
  hideChildModal(): void {
    this.childModal.hide();
  }

}
