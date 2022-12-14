import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SliderIndexComponent } from './pages/slider/slider-index/slider-index.component';
import { SliderCreateComponent } from './pages/slider/slider-create/slider-create.component';
import { SliderUpdateComponent } from './pages/slider/slider-update/slider-update.component';
import { PostIndexComponent } from './pages/posts/post-index/post-index.component';
import { PostCreateComponent } from './pages/posts/post-create/post-create.component';
import { PostUpdateComponent } from './pages/posts/post-update/post-update.component';
import { CategoryIndexComponent } from './pages/categories/category-index/category-index.component';
import { GacetaIndexComponent } from './pages/gaceta/gaceta-index/gaceta-index.component';
import { GacetaCreateComponent } from './pages/gaceta/gaceta-create/gaceta-create.component';
import { GacetaUpdateComponent } from './pages/gaceta/gaceta-update/gaceta-update.component';



const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children:[
      {path: 'slider/index', component: SliderIndexComponent},
      {path: 'slider/create', component: SliderCreateComponent},
      {path: 'slider/update/:id', component: SliderUpdateComponent},
      {path: 'post/index', component: PostIndexComponent},
      {path: 'post/create', component: PostCreateComponent},
      {path: 'post/update/:id', component: PostUpdateComponent},
      {path: 'category/index', component: CategoryIndexComponent},
      {path: 'gaceta/index', component: GacetaIndexComponent},
      {path: 'gaceta/create', component: GacetaCreateComponent},
      {path: 'gaceta/update/:id', component: GacetaUpdateComponent},

      {path: '**', redirectTo:'dashboard'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
