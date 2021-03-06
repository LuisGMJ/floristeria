import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFirestore,
              private toastr: ToastrService) { }

  addProduct(product: Product) {
    const newId = this.db.createId();

    product.id = newId;
    product.views = 0;


    /* const product: Product = {
      id: newId,
      description: 'Regala bellas gerberas y astromelias color rosa, que alegrarán su día. Da color y luz a su vida obsequiándole este precioso arreglo floral. LolaFlora lo entrega el mismo día, para que puedas expresar con flores eso que sientes por dentro. ¡Exprésate con flores!',
      image: 'https://firebasestorage.googleapis.com/v0/b/floreria-53bd3.appspot.com/o/img%2Fproducts%2F28911245-984f-40a4-aa83-b12044a3400c.jpeg?alt=media&token=2ca55b8a-a3d2-44a7-85ac-91be18de7274',
      maincomponents: ['Gerberas'],
      price: 200,
      size: '70x40 cm, altura y ancho',
      title: 'Gerberas',
      type: '4',
      views: 0
    }; */
    return this.db.collection<Product>('arrangement').doc(newId).set(product)
      .then(() => {
        this.toastr.success('¡Producto guadado correctamente!', 'Éxito');
      }, error => {
        this.toastr.error('¡Error al guardar!', 'Error');
        console.error('Error inesperado', error);
      });
  }

  updateProduct(product: Product) {
    return this.db.collection<Product>(`arrangement`).doc(product.id).update(product)
      .then(() => {
        this.toastr.success('¡Producto actualizado correctamente!', 'Éxito');
      }, error => {
        this.toastr.error('¡Error al actualizar!', 'Error');
        console.error('Error inesperado', error);
      });
  }

  getProductsByType(id: string): Observable<any> {
    const data = this.db.collection('arrangement', ref => ref.where('type', '==', id)).valueChanges();
    return data;
  }

  getProduct(id: string): Observable<any> {
    const data = this.db.collection('arrangement', ref => ref.where('id', '==', id)).valueChanges();
    return data;
  }

  getProductTypeList(): Observable<any> {
    const data = this.db.collection('producttype').valueChanges().pipe(
      map(list => list[0])
    );
    return data;
  }

  deleteProduct(id: string) {
    return this.db.collection<Product>(`arrangement`).doc(id).delete();
  }

  updateViews(id: string, views: number) {
    return this.db.collection<Product>(`arrangement`).doc(id).update({ views })
      .then(() => {
        console.log('Éxito');
      }, error => {
        console.error('Error inesperado', error);
      });
  }

}
