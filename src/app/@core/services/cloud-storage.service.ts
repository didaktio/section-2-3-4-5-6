import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({ providedIn: 'root' })
export class CloudStorageService {

    constructor(private afs: AngularFireStorage) { }

    /**
     * Upload a new file to the default Firebase (Cloud) Storage bucket.
     * @param path Location in the bucket at which to store the file.
     * @param file The file to upload, of type BLOB.
     * @returns AngularFireUploadTask: a set of methods for cancelling, pausing, and observing the upload.
     */
    upload(path: string, file: string) {
        return this.afs.ref(path).putString(file, 'data_url');
    }

    /**
     * Returns an observable of the URL to the file found at the given path.
     * @param path Location in the bucket the file was uploaded to.
     */
    img$(path: string) {
        return this.afs.ref(path).getDownloadURL();
    }
}