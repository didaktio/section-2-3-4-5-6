import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/@core/core.module';

import { StandardSignupPage } from './standard-signup.page';



const routes: Routes = [
  {
    path: '',
    component: StandardSignupPage
  }
];

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StandardSignupPage]
})
export class StandardSignupPageModule { }
