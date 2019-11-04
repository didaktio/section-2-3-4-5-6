import { Component, OnInit } from '@angular/core';

import { UserService } from '../@core/services/user.service';

import { map } from 'rxjs/operators';


interface FormData {
  handle: string;
  general?: {
    firstName: string;
    lastName: string;
    mobile: number;
  };
  company?: {
    name: string;
    founded: {
      day: number;
      month: number;
      year: number;
    } | string;
    contact: string;
  };
}


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(private user: UserService) { }

  data$ = this.user.doc$.pipe(
    map(doc => doc ? ({
      accountType: doc.accountType,
      handle: doc.handle,
      ...doc.general,
      ...doc.company
    }) : null)
  );
  edit: boolean;
  result: string;
  companyFoundedDateChanged: boolean;

  ngOnInit() {

  }

  async submit(formData: FormData) {

    const changes = { ...formData };

    try {
      if (this.companyFoundedDateChanged) {
        const foundedDate = new Date(formData.company.founded as string);
        changes.company.founded = {
          day: foundedDate.getDate(),
          month: foundedDate.getMonth() + 1,
          year: foundedDate.getFullYear()
        };
      }

      await this.user.update(changes);

      this.result = 'Changes saved';
      this.edit = false;

    } catch (error) {
      console.error(error);
      this.result = 'An error has occurred. Your changes may not have been saved!';
    }
  }


}
