import { Component, OnInit, Input } from '@angular/core';
import { PaginationService } from '../../../services/pagination.service';
import { ToastrService } from 'ngx-toastr';
import { FilterModel } from '../../../models/filter.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() collectionName: string;
  @Input() noElements: number;
  @Input() orderBy: string;
  @Input() filterBy: FilterModel;

  // Pagination
  // tableData contendrá los elementos del documento que se obtienen de la colección
  tableData: any[] = [];

  // guarda el primer documento en una instantánea de los artículos recibidos
  firstInResponse: any = [];

  // guardar el último documento en una instantánea de los artículos recibidos
  lastInResponse: any = [];

  // mantener la matriz del primer documento de páginas anteriores
  prevStartAt: any = [];

  // mantener el recuento de clics en el botón Siguiente Anterior
  paginationClickedCount = 0;

  // se necesitarán dos botones para cargar los datos siguientes o los datos anteriores
  // deshabilita los botones siguiente y anterior
  disableNext = false;
  disablePrev = true;

  constructor(private paginationService: PaginationService,
              private toastr: ToastrService) {
  }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.getItems();
    }, 500);
  }

  getItems() {

    this.paginationService.getData(this.collectionName, this.noElements, this.orderBy, this.filterBy).subscribe(response => {
      console.log(response);
      
      if (!response.length) {
        console.log('No Data Available');
        return false;
      }
      
      this.firstInResponse = response[0];
      this.lastInResponse = response[response.length - 1];

      this.tableData = [];
      this.paginationService.data = [];
      for (let item of response) {
        this.tableData.push(item.payload.doc.data());
        this.paginationService.data.push(item.payload.doc.data());
      }


      // initialize values
      this.prevStartAt = [];
      this.paginationClickedCount = 0;
      this.disableNext = false;
      this.disablePrev = false;

      // push first item to use for Previous action
      this.pushPrevStartAt(this.firstInResponse);
    }, error => {
      console.log(error);
    });
  }

  // add a document
  pushPrevStartAt(prevFirstDoc) {
    this.prevStartAt.push(prevFirstDoc);
  }

  // remove non required document 
  popPrevStartAt(prevFirstDoc) {
    console.log(prevFirstDoc);
    this.prevStartAt.forEach(element => {
      console.log('---', element);
      if (prevFirstDoc.payload.doc.data().id == element.payload.doc.data().id) {
        element = null;
      }
    });
  }

  // return the Doc rem where previous page will startAt
  getPrevStartAt() {
    if (this.prevStartAt.length > (this.paginationClickedCount + 1)) {
      this.prevStartAt.splice(this.prevStartAt.length - 2, this.prevStartAt.length - 1);
    }
    return this.prevStartAt[this.paginationClickedCount - 1];
  }

  nextPage() {

    this.disableNext = true;
    this.paginationService.getNextPage(this.lastInResponse.payload.doc)
      .subscribe(response => {
        if (!response.length) {
          this.toastr.info('No hay más datos disponibles');
          this.disableNext = true;
          return;
        }


        this.paginationService.data = [];
        this.firstInResponse = response[0];
        this.lastInResponse = response[response.length - 1];
        this.tableData = [];
        for (let item of response) {
          this.tableData.push(item.payload.doc.data());
          this.paginationService.data.push(item.payload.doc.data());
        }
        this.paginationClickedCount++;
        this.pushPrevStartAt(this.firstInResponse);
        if (response.length < this.noElements) {
          // disable next button if data fetched is less than noElements - means no more data left to load
          // because limit ti get data is set to noElements
          this.disableNext = true;
        } else {
          this.disableNext = false;
        }
        this.disablePrev = false;
      }, error => {
        this.disableNext = false;
      });
  }

  prevPage() {

    this.disablePrev = true;
    this.paginationService.getPrevPage(this.getPrevStartAt().payload.doc, this.firstInResponse.payload.doc)
      .subscribe(response => {
        this.firstInResponse = response[0];
        this.lastInResponse = response[response.length - 1];

        this.tableData = [];
        this.paginationService.data = [];
        for (let item of response) {
          this.tableData.push(item.payload.doc.data());
          this.paginationService.data.push(item.payload.doc.data());
        }

        // maintaing page no.
        this.paginationClickedCount--;
        // pop not required value in array
        this.popPrevStartAt(this.firstInResponse);

        // enable buttons again
        if (this.paginationClickedCount == 0) {
          this.disablePrev = true;
        } else {
          this.disablePrev = false;
        }
        this.disableNext = false;
      }, error => {
        this.disablePrev = false;
      });
  }

  scrollTop() {
    window.scrollTo(0, 390);
  }

}
