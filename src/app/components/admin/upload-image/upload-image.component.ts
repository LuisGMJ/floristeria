import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ImageService } from '../../../services/image.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  private imageUrl: string;

  public file: any;

  private allowedFiles = ['image/jpeg', 'image/png'];

  @Input() imageName: string;

  @Output() imageUpload: EventEmitter<any>;
  
  constructor(public imageService: ImageService,
              private toastr: ToastrService,
              private storage: AngularFireStorage ) {
    this.imageUpload = new EventEmitter();
  }
  
  ngOnInit(): void {
  }

  loadFile(event: any) {
    this.file = event;
  }

  uploadFile(event) {
    const file = event.target.files[0];

    if (!this.allowedFiles.includes(file.type)) {
      this.toastr.error('Formato de archivo no válido');
      return;
    }

    this.imageService.uploadFile(event, this.imageName).subscribe((path: string) => {
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
