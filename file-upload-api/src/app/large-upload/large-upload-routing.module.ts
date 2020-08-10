import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LargeUploadPage } from './large-upload.page';

const routes: Routes = [
  {
    path: '',
    component: LargeUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LargeUploadPageRoutingModule {}
