import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterpriseSignupPage } from './enterprise-signup.page';
import { CoreModule } from 'src/app/@core/core.module';


const routes: Routes = [
  {
    path: '',
    component: EnterpriseSignupPage
  }
];

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EnterpriseSignupPage]
})
export class EnterpriseSignupPageModule { }
