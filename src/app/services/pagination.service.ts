import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  data: any[];

  constructor(private db: AngularFirestore) { }

  // Obtaining data by sections for pagination
  getData(collectionName: string, noElements: number, order: string): Observable<any> {
    return this.db.collection(collectionName, ref => ref
      .limit(noElements)
      .orderBy(order, 'desc')
    ).snapshotChanges();
  }

  getNextPage(lastInResponse: any) {
    return this.db.collection('arrangement', ref => ref
      .limit(5)
      .orderBy('views', 'desc')
      .startAfter(lastInResponse)
    ).snapshotChanges();
  }

  getPrevPage(prevStartAt: any, firstInResponse: any) {
    return this.db.collection('arrangement', ref => ref
      .orderBy('views', 'desc')
      .startAt(prevStartAt)
      .endBefore(firstInResponse)
      .limit(5)
    ).snapshotChanges();
  }
}
