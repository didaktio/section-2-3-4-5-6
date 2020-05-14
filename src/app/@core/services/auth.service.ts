import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { first, switchMap, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { CustomClaims } from '../models/user';


@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private afAuth: AngularFireAuth,
        private aff: AngularFireFunctions) { }

    /**
     * The user's Firebase UID.
     */
    uid: string;
    /**
     * Observable of the user's Firebase Credential AND custom claims.
     */
    user$ = this.afAuth.authState.pipe(
        tap(userCredential => {
            this.uid = userCredential.uid;
        }),
        switchMap(userCredential => userCredential ? this.userCustomClaims$.pipe(
            map(claims => ({
                ...claims,
                ...userCredential
            }))
        ) : of(null)
        )
    ) as Observable<CustomClaims & firebase.User>;

    /**
     * Observable of the user's custom claims (as set in backend using Firebase Admin SDK).
     */
    userCustomClaims$ = this.afAuth.idTokenResult.pipe(
        map(token => token ? token.claims.custom : null)
    ) as Observable<CustomClaims>;

    /**
     * Indicates whether the user has just logged in.
     */
    newLogin: boolean;

    /**
     * The current user's account type.
     */
    async getAccountType() {
        return (await this.userCustomClaims$.pipe(first()).toPromise()).accountType;
    }

    /**
     * Login user with custom token generated on the server.
     * @param token Unique token returned by `createUserOnServer` method.
     * @returns Firebase User Credential.
     */
    loginWithToken(token: string) {
        this.newLogin = true;
        return this.afAuth.signInWithCustomToken(token);
    }

    /**
     * Create a new user using the Firebase Admin SDK, which is usable only in a secure environment (eg our server).
     * @param options Object containing credentials to be used for login.
     * * `email` Accessible email for logging in (not necessarily same as user's preferred email).
     * * `password` Decently strong password.
     * * `accountType` Type of account to create.
     *  @returns Custom token to be used for login.
     */
    createUserOnServer({ email, password, accountType }): Promise<string> {
        return this.aff.httpsCallable('createUser')({ email, password, accountType }).toPromise();
    }

    /**
     * Refresh the authenticated user's JSON web token without breaking authentication status.
     * Use when changes to user's custom claims have occurred.
     * @returns New Token ID.
     */
    async refreshClaims() {
        return (await this.afAuth.currentUser).getIdToken(true);
    }

    async reloadUser() {
        return (await this.afAuth.currentUser).reload();
    }

    /**
     * Live check of whether user is authenticated. This is the most reliable check because it speaks directly to the Firebase authstate observable.
     * NOTE TO DEV: The map operator commented out to allow returning of potentially useful data. Comment back in to return only boolean representing.
     * @returns User credential with custom claims OR null (OR a boolean).
     */
    isLoggedIn() {
        return this.user$.pipe(
            first(),
            // map(v => !!v)
        ).toPromise();
    }

    /**
     * Basic login using email and password.
     * * @param options Object containing credentials to be used for login.
     * * `email` Email used when signing up.
     * * `password` Password used when signing up.
     *  @returns Firebase User Credential
     */
    login({ email, password }) {
        this.newLogin = true;
        return this.afAuth.signInWithEmailAndPassword(email, password);
    }

    /**
     * Present google login popup or browser tab. On success, user will be redirected back to application.
     *  @returns Firebase User Credential
     */
    loginGoogle() {
        return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    /**
     * Create a new user; log them in if successful. Various error codes can be thrown - be sure to create dedicated logic for the most graceful handling.
     * @param options Object containing credentials to be used for login.
     * * `email` Accessible email for logging in (not necessarily same as user's preferred email).
     * * `password` Decently strong password.
     *  @returns Firebase User Credential
     */
    createUser({ email, password }) {
        return this.afAuth.createUserWithEmailAndPassword(email, password);
    }

    /**
     * Create a new reCAPTCHA form, ready for presentation in the UI. All linkage with the user's account is done under the hood.
     * @param elementId ID of the HTML element to attach the form.
     * @param options (See reCAPTCHA docs).
     * @returns Verifier ready to be presented to user (by calling render()).
     */
    reCAPTCHA(elementId: string, options?: {}) {
        return new firebase.auth.RecaptchaVerifier(elementId, options);
    }

    /**
     * Instruct Firebase to send the user a Password Reset email.
     * @param email User's email.
     */
    sendPasswordResetEmail(email: string) {
        return this.afAuth.sendPasswordResetEmail(email);
    }

    /**
     * Deauthenticate user on the Firebase plane.
     */
    logout() {
        return this.afAuth.signOut();
    }
}



























