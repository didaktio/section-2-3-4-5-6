import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { first, map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class EnterpriseOnlyGuard implements CanActivate {

    constructor(
        private user: UserService,
        private router: Router) { }

    async canActivate() {

        const accountType = await this.user.doc$.pipe(
            map(doc => doc ? doc.accountType : null),
            first()
        ).toPromise();

        if (accountType == 'enterprise') return true;

        console.warn('EnterpriseOnlyGuard: account is not enterprise account. Redirected to home page');
        return this.router.parseUrl('/home');
    }
}
