import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../@core/core.module';

import { AccountPage } from './account.page';

import { ProfilePicModule } from '../shared/components/profile-pic/profile-pic.module';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  }
];

@NgModule({
  imports: [
    CoreModule,
    ProfilePicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccountPage]
})
export class AccountPageModule {}
