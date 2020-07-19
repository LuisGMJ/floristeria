import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GeneralDataService {

  constructor(private db: AngularFirestore) { }

  getDataFromDb(): Observable<any> {
    return this.db.collection<any>('/generaldata').
      valueChanges().pipe(
        map(data => {
          this.setData(data[0]);
          return data[0];
        })
      );
  }

  readLocalData() {
    return JSON.parse(localStorage.getItem('generalData'));
  }

  setData(generalData: any) {
    localStorage.setItem('generalData', JSON.stringify(generalData));
  }
}
