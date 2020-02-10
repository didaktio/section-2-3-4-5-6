import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxPopperModule } from 'ngx-popper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderModule } from './header/header.module';
import { CamelToTitlePipe } from './utils/pipes/decamel';


/**
 * Module containing components, widgets, pages, services, directives and other features that are **core** to the application's operation.
 * In non-Lazy Loaded apps, the `app.module.ts` file performs this function; but this app is Lazy Loaded.
 */
@NgModule({
    declarations: [
        CamelToTitlePipe
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPopperModule.forRoot(),
        MatTooltipModule,
        HeaderModule
    ],
    exports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPopperModule,
        MatTooltipModule,
        HeaderModule,
        CamelToTitlePipe
    ],
    providers: [],
})
export class CoreModule { }