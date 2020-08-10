import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LargeUploadPageRoutingModule } from './large-upload-routing.module';

import { LargeUploadPage } from './large-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LargeUploadPageRoutingModule
  ],
  declarations: [LargeUploadPage]
})
export class LargeUploadPageModule {}
