import { NgModule } from '@angular/core';

import { CoreModule } from 'src/app/@core/core.module';
import { ProfilePicComponent } from './profile-pic.component';

import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
    declarations: [
        ProfilePicComponent
    ],
    imports: [ 
        CoreModule,
        ImageCropperModule,
     ],
    exports: [
        ProfilePicComponent
    ],
    providers: [],
})
export class ProfilePicModule {}