import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './modules/auth/pages/private/private.component';
import { SessionGuard } from './core/guards/session.guard';

import { PostComponent } from './modules/home/pages/post/post.component';
import { LoginComponent } from './login/login.component';
import { HojaRutaModule } from './modules/hoja-ruta/hoja-ruta.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'private',
    component: PrivateComponent,
    // canActivate: [SessionGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [SessionGuard]
  },
  // {
  //   path: 'post',
  //   component: PostComponent,
  //   // canActivate: [SessionGuard]
  // },
  {
    path: 'blog',
    loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule),
    // canActivate: [SessionGuard]
  },
  {
    path: 'ruta',
    loadChildren: () => import('./modules/hoja-ruta/hoja-ruta.module').then(m => m.HojaRutaModule),
    // canActivate: [SessionGuard]
  },
  {
    path: '**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }