import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'large-upload',
    loadChildren: () => import('./large-upload/large-upload.module').then( m => m.LargeUploadPageModule)
  },
  {
    path: 'tusdotnet',
    loadChildren: () => import('./tusdotnet/tusdotnet.module').then( m => m.TusdotnetPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
