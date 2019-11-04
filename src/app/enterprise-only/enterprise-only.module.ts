import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterpriseOnlyPage } from './enterprise-only.page';
import { CoreModule } from '../@core/core.module';


const routes: Routes = [
  {
    path: '',
    component: EnterpriseOnlyPage
  }
];


@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EnterpriseOnlyPage]
})
export class EnterpriseOnlyPageModule {}
