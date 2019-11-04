import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { AuthService } from '../@core/services/auth.service';
import { UserService } from '../@core/services/user.service';

import { LocalData } from '../@core/models/user';
import { AlertController, LoadingController } from '@ionic/angular';
import { TimestampServer } from '../@core/services/db.service';


interface LoginForm {
  email: string;
  password: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private user: UserService,
    private lclStorage: Storage,
    private alertCtrl: AlertController,
    private loading: LoadingController) { }

  showPassword = false;
  error: string;
  captchaSolved: boolean;
  localData: LocalData;

  async ngOnInit() {
    this.localData = await this.lclStorage.get('myAppLocal');
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(20)]]
  });

  async submit(formData: LoginForm) {
    try {
      await this.auth.login(formData);

      const accountType = await this.auth.getAccountType();

      await this.router.navigateByUrl(`/${accountType == 'enterprise' ? 'enterprise-only' : 'home'}`);

    } catch ({ code }) {
      switch (code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          this.error = 'Login attempt failed: Unrecognised details. Are you a registered user?';
          break;
        case 'auth/user-disabled': this.error = 'Account deactivated. If you wish to reactivate, please contact support.'
          break;
        case 'auth/invalid-email': this.error = 'Login attempt failed: Invalid email address';
          break;
        case 'auth/too-many-requests':
          this.error = 'Hmmm... Too many attempts have been made. Please confirm your are not a bot.';
          this.presentCaptcha();
          break;
        default: this.error = 'An unknown error has occurred! Very Likely, the cause is rebellious monkeys.';
      }
    }

  }

  async googleLogin() {
    const res = await this.auth.loginGoogle();
    if (res.additionalUserInfo.isNewUser) await this.user.update({
        accountType: 'standard',
        general: {
          email: res.user.email,
          firstName: res.user.displayName,
          lastName: '',
          mobile: ''
        },
        uid: res.user.uid,
        handle: 'unset',
        createdAt: TimestampServer()
      });
    // await this.auth.reloadUser();
    this.router.navigateByUrl('/home');
  }

  async presentCaptcha() {
    const el = 'captchaContainer';
    document.getElementById(el).innerHTML = "";

    this.captchaSolved = false;

    this.auth.reCAPTCHA(el, {
      'callback': () => this.captchaSolved = true
    }).render();
  }

  deleteLocalData() {
    this.lclStorage.remove('myAppLocal');
    this.localData = null;
  }

  async forgotPassword() {
    const alert = await this.alertCtrl.create({
      header: 'Reset Password',
      inputs: [{ name: 'userEmail', placeholder: 'Enter your email' }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Send me a reset link',
          handler: async data => {

            const loading = await this.loading.create({ message: 'Please wait...' });
            await loading.present();

            try {
              await this.auth.sendPasswordResetEmail(data.userEmail);

              await this.loading.dismiss();

              const successAlert = await this.alertCtrl.create({
                header: 'Email Sent',
                message: 'Please check your email to create a new password.',
                buttons: ['Close']
              });
              successAlert.present();

            } catch ({ code }) {

              let error: string;

              if (code === 'auth/user-not-found') error = 'Unrecognised details. Perhaps you made a typo?';
              else if (code === 'auth/invalid-email') error = 'You entered an unrecognised or invalid email';

              await this.loading.dismiss();

              const errorAlert = await this.alertCtrl.create({
                header: 'Error',
                subHeader: error,
                buttons: [
                  { text: 'Back', handler: () => this.forgotPassword() },
                  'Close'
                ]
              });
              await errorAlert.present();
            }
          }
        }]
    });

    await alert.present();
  }

}
