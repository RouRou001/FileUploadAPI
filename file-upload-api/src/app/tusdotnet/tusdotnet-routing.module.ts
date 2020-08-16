import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TusdotnetPage } from './tusdotnet.page';

const routes: Routes = [
  {
    path: '',
    component: TusdotnetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TusdotnetPageRoutingModule {}
