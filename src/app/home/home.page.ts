import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../@core/services/user.service';

import { map } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private user: UserService,
    private router: Router) { }

  data$ = this.user.doc$.pipe(
    map(doc => doc ? ({
      accountCardData: {
        ...doc.general,
        ...doc.company,
        accountType: doc.accountType,
        createdAt: doc.createdAt.toDate(),
        uid: doc.uid,
        handle: doc.handle
      }
    }) : of(null))
  );

  accountCardEditClicked() {
    this.router.navigate(['/account']);
  }

}
