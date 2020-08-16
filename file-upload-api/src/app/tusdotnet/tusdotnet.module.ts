import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TusdotnetPageRoutingModule } from './tusdotnet-routing.module';

import { TusdotnetPage } from './tusdotnet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TusdotnetPageRoutingModule
  ],
  declarations: [TusdotnetPage]
})
export class TusdotnetPageModule {}
