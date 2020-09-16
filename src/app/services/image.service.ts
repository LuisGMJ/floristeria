import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  uploadPercent: Observable<number>;

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore,
              private toastr: ToastrService) { }

  uploadFile(event, imageName: string) {
    const file = event.target.files[0];
    const filePath = `img/products/${event.target.files[0].name}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file, { customMetadata: {name: file.name}});

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    return task.snapshotChanges().pipe(
      map(res => filePath),
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          this.addImageToList(file, filePath, url, imageName);
        },
        error => error);
      }),
    );
  }

  addImageToList(file: any, filePath: string, url: string, imageName: string) {
    const name = imageName ? imageName : file.name;
    const newId = this.db.createId();

    const image = {
      id: newId,
      name,
      filePath,
      url
    };

    console.log(newId, '-', name);

    return this.db.collection<any>('image-list').doc(newId).set(image);
  }

  getImageById(id: string): Observable<any> {
    const data = this.db.collection<any>('image-list', ref => ref
      .where('id', '==', id)
    ).valueChanges();

    return data;
  }

  updateImageName(image: any) {
    return this.db.collection(`image-list`).doc(image.id).update(image)
      .then(() => {
        this.toastr.success('Imagen actualizada correctamente!', 'Éxito');
      }, error => {
        this.toastr.error('¡Error al actualizar!', 'Error');
        console.error('Error inesperado', error);
      });
  }

  deleteImage(image: any) {
    return this.db.collection(`image-list`).doc(image.id).delete().then(() => {
      this.storage.ref(image.filePath).delete().subscribe(resp => {
        this.toastr.success('¡Imagen eliminada correctamente!', 'Éxito');
      }, error => console.log('Error inesperado', error.message));
    }, error => {
      this.toastr.error('¡Error al eliminar!', 'Error');
      console.error('Error inesperado', error);
    });
  }

}
