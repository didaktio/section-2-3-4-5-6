import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LikedCompaniesPage } from './liked-companies.page';

import { CoreModule } from '../@core/core.module';


const routes: Routes = [
  {
    path: '',
    component: LikedCompaniesPage
  }
];


@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LikedCompaniesPage]
})
export class LikedCompaniesPageModule {}
