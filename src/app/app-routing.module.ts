import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate, AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { EnterpriseOnlyGuard } from './@core/guards/enterprise-only.guard';

// NOTE: Since this was filmed a bug has been introduce to the AngularFireGuards which has yet to be properly resolved. I've added the 
// temporary fix, but my advice is to stick to classic, manually-written guards for now.

const redirectUnauthorizedUser = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInUser = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedUser }
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInUser }
  },
  {
    path: 'signup',
    children: [
      {
        path: '',
        loadChildren: () => import('./signup/standard/standard-signup.module').then(m => m.StandardSignupPageModule)
      },
      {
        path: 'enterprise',
        loadChildren: () => import('./signup/enterprise/enterprise-signup.module').then(m => m.EnterpriseSignupPageModule)
      }
    ],
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedUser }  },
  {
    path: 'enterprise-only',
    loadChildren: () => import('./enterprise-only/enterprise-only.module').then(m => m.EnterpriseOnlyPageModule),
    canActivate: [EnterpriseOnlyGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedUser }
  },
  {
    path: 'liked-companies',
    loadChildren: () => import('./liked-companies/liked-companies.module').then(m => m.LikedCompaniesPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedUser }
  },
  { path: 'some-page', loadChildren: './some-page/some-page.module#SomePagePageModule' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
