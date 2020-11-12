import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ImageService } from '../../../services/image.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  private imageUrl: string;

  public file: any;

  private allowedFiles = ['image/jpeg', 'image/png'];

  @Input() image: Observable<string>;

  @Output() imageUpload: EventEmitter<any>;

  constructor(public imageService: ImageService,
              private toastr: ToastrService,
              private storage: AngularFireStorage)
  {
    this.imageUpload = new EventEmitter();
  }

  public control = new FormControl([]);

  ngOnInit(): void {
    console.log(this.control);
    if (this.image) {
      this.control.setValue([{preview: this.image}]);
    } else {
      this.control.reset();
    }
  }

  loadFile() {
    console.log(this.control);
    this.file = this.control.value[0].file;
  }

  uploadFile() {
    if (!this.allowedFiles.includes(this.file.type)) {
      this.toastr.error('Formato de archivo no válido');
      return;
    }

    this.imageService.uploadFile(this.file, this.file.name).subscribe((path: string) => {
      this.storage.ref(path).getDownloadURL().subscribe(url => this.imageUrl = url);
    }, (err) => console.error('Error inesperado: ', err),
      () => {
        this.emiteUrl();
        this.toastr.success('¡Imagen cargada correctamente!', 'Éxito');
      });
  }

  emiteUrl() {
    // Mando la url al componente padre
    this.imageUpload.emit(this.imageUrl);
  }

}
