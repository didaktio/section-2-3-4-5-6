import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../@core/core.module';

import { LoginPage } from './login.page';


const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];


@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
