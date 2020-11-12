import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { scan, tap, take, map } from 'rxjs/operators';
import { QueryConfig } from '../models/query-config.model';
import { FilterModel } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  data: any[];
  private collectionName: string;
  private noElements: number;
  private orderBy: string;
  private filterBy: FilterModel;



  // Source data
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  private query: QueryConfig;

  // Observable data
  datas: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();




  constructor(private db: AngularFirestore) { }

  // Obtaining data by sections for pagination
  getData(collectionName: string, noElements: number, order: string, filterBy?: FilterModel): Observable<any> {

    this.noElements = noElements;
    this.orderBy = order;
    this.collectionName = collectionName;
    this.filterBy = filterBy;

    if (filterBy) {
      return this.db.collection(collectionName, ref => ref
        .where(filterBy.type, '==', filterBy.value)
        .limit(noElements)
        .orderBy(order, 'desc')
      ).snapshotChanges();
    } else {
      return this.db.collection(collectionName, ref => ref
        .limit(noElements)
        .orderBy(order, 'desc')
      ).snapshotChanges();
    }

  }

  getNextPage(lastInResponse: any) {
    return this.db.collection(this.collectionName, ref => ref
      .limit(this.noElements)
      .orderBy(this.orderBy, 'desc')
      .startAfter(lastInResponse)
    ).snapshotChanges();
  }

  getPrevPage(prevStartAt: any, firstInResponse: any) {
    return this.db.collection(this.collectionName, ref => ref
      .orderBy(this.orderBy, 'desc')
      .startAt(prevStartAt)
      .endBefore(firstInResponse)
      .limit(this.noElements)
    ).snapshotChanges();
  }

  /* -------------------------------------------------------- */

  // Initial query sets options and defines the Observable
  // passing opts will override the defaults
  init(path: string, field: string, opts?: any) {
    this.query = {
      path,
      field,
      limit: 2,
      reverse: false,
      prepend: false,
      ...opts
    };

    const first = this.db.collection(this.query.path, ref => {
      return ref
        .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
        .limit(this.query.limit);
    });

    this.mapAndUpdate(first);

    // Create the observable array for consumption in components
    this.datas = this._data.asObservable().pipe(
      scan((acc, val) => {
        return this.query.prepend ? val.concat(acc) : acc.concat(val);
      })
    );
  }


  // Retrieves additional data from firestore
  more() {
    const cursor = this.getCursor();

    const more = this.db.collection(this.query.path, ref => {
      return ref
        .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
        .limit(this.query.limit)
        .startAfter(cursor);
    });
    this.mapAndUpdate(more);
  }


  // Determines the doc snapshot to paginate query 
  private getCursor() {
    const current = this._data.value;
    if (current.length) {
      return this.query.prepend ? current[0].doc : current[current.length - 1].doc;
    }
    return null;
  }


  // Maps the snapshot to usable format the updates source
  private mapAndUpdate(col: AngularFirestoreCollection<any>) {

    if (this._done.value || this._loading.value) {
      return;
    }

    // loading
    this._loading.next(true);

    // Map snapshot with doc ref (needed for cursor)
    return col.snapshotChanges()
      .pipe(
        tap(arr => {
          let values = arr.map(snap => {
            const data = snap.payload.doc.data();
            const doc = snap.payload.doc;
            return { ...data, doc };
          });

          // If prepending, reverse the batch order
          values = this.query.prepend ? values.reverse() : values;

          // update source with new values, done loading
          this._data.next(values);
          this._loading.next(false);

          // no more values, mark done
          if (!values.length) {
            this._done.next(true);
          }
        }),
        take(1)
      )
      .subscribe();
  }

  reset() {
    this._data.next([]);
    this._done.next(false);
  }
}
