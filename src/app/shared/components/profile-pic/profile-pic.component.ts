import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { UserService } from 'src/app/@core/services/user.service';

import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss'],
})
export class ProfilePicComponent implements OnInit {

  constructor(
    public user: UserService,
    private toastCtrl: ToastController) { }

  ngOnInit() { }

  imageUploadedEvent: any;
  croppedImg: ImageCroppedEvent;
  profilePicLoading: boolean;

  async imageUploaded(event) {

    // Halt upload of file larger than 5mb as soon as it is known.
    if (event.target.files[0].size && event.target.files[0].size > 500 * 100 * 100) {

      const toast = await this.toastCtrl.create({
        header: 'Oh no!',
        message: 'This image file too large. Please upload an file less than 5mb.',
        color: 'danger',
        showCloseButton: true
      });
      toast.present();

    }
    else this.imageUploadedEvent = event;
  }

  async imageUploadFailed() {
    const toast = await this.toastCtrl.create({
      header: 'Upload failed',
      message: 'Please try refreshing the page. Ensure the file is an image type, and under 5mb in size.',
      color: 'danger',
      showCloseButton: true
    });
    toast.present();
  }

  imageCropped(ev: ImageCroppedEvent) {
    this.croppedImg = ev;
  }

  async saveImg() {
    this.profilePicLoading = true;
    try {
      await this.user.updateProfilePic(this.croppedImg.file);
      this.imageUploadedEvent = null;

      const toast = await this.toastCtrl.create({
        message: 'Profile pic saved',
        color: 'dark',
        duration: 3000
      });
      toast.present();

    } catch (error) {
      console.error(error);
    }

    this.profilePicLoading = false;
  }

}
