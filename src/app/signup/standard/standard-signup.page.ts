import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

import { UserService } from '../../@core/services/user.service';
import { AuthService } from '../../@core/services/auth.service';

import { TimestampServer } from 'src/app/@core/services/db.service';


interface FormData {
  firstName: string;
  lastName: string;
  mobile: string;
  dateOfBirth: string;
  handle: string;
  email: string;
  password: string;
}


@Component({
  templateUrl: './standard-signup.page.html',
  styleUrls: ['./standard-signup.page.scss'],
})
export class StandardSignupPage implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private user: UserService,
    private auth: AuthService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) { }

  signupForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z- ]+'), Validators.maxLength(20)]],
    lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z- ]+'), Validators.maxLength(20)]],
    mobile: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(15)]],
    dateOfBirth: [''],
    handle: ['', [Validators.required, Validators.pattern('[a-zA-Z-_0-9 ]+'), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(20)]],
  });
  datetimeConfig = {
    min: '1950',
    max: '2005'
  };
  showPassword = false;

  ngOnInit() { }

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get mobile() {
    return this.signupForm.get('mobile');
  }

  get dateOfBirth() {
    return this.signupForm.get('dateOfBirth');
  }

  get handle() {
    return this.signupForm.get('handle');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  async submit({ email, password, ...formData }: FormData) {
    this.user.accountType = 'standard';

    const loading = await this.loadingCtrl.create();

    try {
      await loading.present();

      const token = await this.auth.createUserOnServer({ email, password, accountType: 'standard' });
      await this.auth.loginWithToken(token);

      const dobDate = new Date(formData.dateOfBirth);
      const userDoc = {
        uid: this.auth.uid,
        general: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          mobile: formData.mobile,
          dateOfBirth: {
            day: dobDate.getDate(),
            month: dobDate.getMonth() + 1,
            year: dobDate.getFullYear()
          }
        },
        handle: formData.handle,
        accountType: 'standard',
        createdAt: TimestampServer()
      }

      await this.user.update(userDoc);

      await this.router.navigateByUrl('/home');

      const toast = await this.toastCtrl.create({
        message: `Welcome, ${formData.firstName}!`,
        position: 'bottom',
        duration: 3000
      });
      toast.present();

    } catch (error) {
      console.error(error);
    }
    loading.dismiss();
  }
}
