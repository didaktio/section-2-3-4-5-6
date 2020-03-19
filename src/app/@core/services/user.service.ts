import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { DbService } from './db.service';
import { AuthService } from './auth.service';
import { CloudStorageService } from './cloud-storage.service';

import { switchMap, tap, shareReplay } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { User, AccountType } from '../models/user';
import { AngularFireStorageReference } from '@angular/fire/storage';


/**
 * Set of methods and properties dedicated to presentation and manipulation of the user's data.
 */
@Injectable({ providedIn: 'root' })
export class UserService {

    uid: string;
    name: string;
    accountType: AccountType = 'standard'; // Standard account is the default.
    isLoggedIn: boolean;

    constructor(
        private db: DbService,
        private auth: AuthService,
        private cloudStorage: CloudStorageService,
        private lclStorage: Storage) { }

    /**
     * Observable of the user's Firestore data.
     */
    doc$ = this.auth.user$.pipe(
        // Set loggedIn property to reflect authstate. (Could also be done inside below switchMap. It's added only for learning purposes.)
        tap(u => {
            {
                if (u && !this.isLoggedIn) this.isLoggedIn = true;
                else if (!u) this.isLoggedIn = false;
            }
        }),
        // IF user is authenticated, switch observable to one of user's Firestore document; else return observable of null.
        switchMap(u => u ? (this.db.doc$(`${u.accountType || this.accountType}/${u.uid}`) as Observable<User.Enterprise & User.Standard>)
            .pipe(
                // IF user is authenticated but no document is found, return observable of null. Else perform some additional logic before
                // returning observable of document. (This could also be done in an another (nested) tap operator, but it's cleaner like this.)
                switchMap(doc => {
                    if (!doc) return of(null);

                    this.uid = u.uid;
                    this.accountType = doc.accountType;

                    // Set user's name / company name.
                    if (this.accountType == 'standard') this.name = doc.general.firstName;
                    else this.name = doc.company.name;

                    // Update database to reflect authentication status.
                    if (this.auth.newLogin) {
                        this.update({ loggedIn: true });
                        this.auth.newLogin = false;
                    }

                    // Store some basic data on the host device.
                    this.lclStorage.set('myAppLocal', {
                        accountType: doc.accountType,
                        name: doc.accountType == 'enterprise' ? doc.company.name : doc.general.firstName,
                        handle: doc.handle
                    });

                    return of(doc);
                })
            )
            : of(null)),
            shareReplay()
    ) as Observable<User.Enterprise & User.Standard>;

    /**
     * Observable of the download link to the user's profile picture.
     */
    profilePic$ = this.doc$.pipe(
        switchMap(doc => (doc && doc.profilePicPath) ? this.cloudStorage.img$(doc.profilePicPath) : of(null))) as Observable<AngularFireStorageReference>;


    /**
     * Update the current user's Firestore document.
     * @param data Data to merge in.
     */
    update(data: {}) {
        return this.db.updateDoc(`${this.accountType}/${this.auth.uid}`, data);
    }

    /**
     * Change the user's profile picture and update the Firestore document with the new download link.
     * @param file Image in BLOB form.
     */
    async updateProfilePic(file: string) {
        const profilePicPath = `${this.accountType}/${this.auth.uid}`;
        await this.cloudStorage.upload(profilePicPath, file);
        return this.update({ profilePicPath });
    }

    /**
     * Log user out and update Firestore Document to reflect authentication status.
     */
    async logout() {
        try {
            await this.update({ loggedIn: false });
            return this.auth.logout();

        } catch (error) {
            console.error(error);
        }
    }
}