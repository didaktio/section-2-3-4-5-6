import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

import { UserService } from './@core/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    public user: UserService,
    private router: Router) {

    this.initializeApp();
  }

  menuBtns = [
    { path: 'home', label: 'Home', icon: 'home' },
    { path: 'account', label: 'Acccount', icon: 'person' },
  ]

  initializeApp() {
    this.platform.ready()
  }

  async logout() {
    await this.user.logout();
    window.location.reload(); 
    // Forcing browser refresh on logout quickly resets services and other dependencies. 
    // For much better UX, reset services and redirect user manually (eg with this.router.navigateByUrl('/login')). 
  }
}
