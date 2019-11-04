import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../@core/services/user.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../@core/services/auth.service';
import { TimestampServer } from 'src/app/@core/services/db.service';

interface FormData {
  companyName: string;
  contact: string;
  founded: string;
  handle: string;
  email: string;
  password: string;
}

@Component({
  templateUrl: './enterprise-signup.page.html',
  styleUrls: ['./enterprise-signup.page.scss'],
})
export class EnterpriseSignupPage implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private user: UserService,
    private auth: AuthService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) { }

  signupForm = this.fb.group({
    companyName: ['', [Validators.required, Validators.pattern('[a-zA-Z- ]+'), Validators.maxLength(20)]],
    founded: [''],
    contact: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(15)]],
    handle: ['', [Validators.required, Validators.pattern('[a-zA-Z-_0-9 ]+'), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(20)]],
  });
  datetimeConfig = {
    min: '1950'
  };
  showPassword = false;

  ngOnInit() { }

  get companyName() {
    return this.signupForm.get('companyName');
  }

  get founded() {
    return this.signupForm.get('founded');
  }

  get contact() {
    return this.signupForm.get('contact');
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
    this.user.accountType = 'enterprise';

    const loading = await this.loadingCtrl.create();

    try {
      await loading.present();

      const token = await this.auth.createUserOnServer({ email, password, accountType: 'enterprise' });
      await this.auth.loginWithToken(token);

      const foundedDate = new Date(formData.founded);
      const userDoc = {
        uid: this.auth.uid,
        company: {
          name: formData.companyName,
          founded: {
            day: foundedDate.getDate(),
            month: foundedDate.getMonth() + 1,
            year: foundedDate.getFullYear()
          },
          contact: formData.contact
        },
        handle: formData.handle,
        accountType: 'enterprise',
        createdAt: TimestampServer()
      };

      await this.user.update(userDoc);

      await this.router.navigateByUrl('/home');

      const toast = await this.toastCtrl.create({
        message: `Welcome, ${formData.companyName}!`,
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
