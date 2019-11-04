import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../@core/core.module';

import { HomePage } from './home.page';

import { ProfilePicModule } from '../shared/components/profile-pic/profile-pic.module';

import { AccountCardComponent } from './account-card/account-card.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CoreModule,
    ProfilePicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomePage,
    AccountCardComponent
  ]
})
export class HomePageModule { }
