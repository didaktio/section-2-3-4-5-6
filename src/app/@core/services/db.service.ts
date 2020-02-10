import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/firestore';


export const TimestampServer = firebase.firestore.FieldValue.serverTimestamp;
export type Timestamp = firebase.firestore.Timestamp;


@Injectable({ providedIn: 'root' })
export class DbService {

    constructor(
        private db: AngularFirestore) { }


    /**
     * Set a new document in Firestore. NOTE: This is a destructive method; it will overwrite documents that 
     * already exist at the given path. To update a document, use the updateDoc method.
     * @param path Path to the document
     * @param data Data to store in the document.
     */
    setDoc(path: string, data: {}) {
        return this.db.doc(path).set(data);
    }

    /**
     * Update Firestore at the given location. Documents found at the path will be updated; if no document exists, one will be created.
     * @param path Location in the database of the document to update/create.
     * @param data Data to add to the document.
     */
    updateDoc(path: string, data: {}) {
        return this.db.doc(path).set(data, { merge: true });
    }

    /**
     * Returns an observable of the data of the document found at the given location. The ID is also included.
     * @param path Location in the database of the document.
     */
    doc$(path): Observable<any> {
        return this.db.doc(path).snapshotChanges().pipe(
            map(doc => ({ ...doc.payload.data() as any, id: doc.payload.id }))
        );
    }

    /**
     * Returns an observable of documents found at the given location. A query can be passed to refine the search — and should be if 
     * performance and most importantly, cost, are of concern. Firebase charges for every single: query, document read, and document write.
     * @param path Database location of the collection to query.
     * @param query (**RECOMMENDED**) One or more conditions which the documents must match. For example:
     * ```
     * const matches = collection$('myCollection', ref => ref
     * .where('monthRegistered', '==', 'June')
     * .where('interests', 'array-contains', 'soccer')
     * .where('stats.timesLoggedIn', '>', '10'));
     * ```
     * This would return documents where the:
     * * `monthRegistered` property equals '**June**'
     * * `interests` array contains '**soccer**'
     * * `timesLoggedIn` property of the 'stats' object is greater than **10**
     */
    collection$(path: string, query?: QueryFn): Observable<any[]> {
        return this.db.collection(path, query).snapshotChanges().pipe(
            map(docs => docs.map(d => ({ ...d.payload.doc.data() as any, id: d.payload.doc.id })))
        );
    }

}