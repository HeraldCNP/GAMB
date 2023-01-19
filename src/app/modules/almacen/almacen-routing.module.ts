import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadIndexComponent } from './pages/actividades/actividad-index/actividad-index.component';
import { CategoriaIndexComponent } from './pages/categorias/categoria-index/categoria-index.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgramaIndexComponent } from './pages/programas/programa-index/programa-index.component';
import { ProyectoIndexComponent } from './pages/proyectos/proyecto-index/proyecto-index.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'categoria/index', component: CategoriaIndexComponent },
      { path: 'programa/index', component: ProgramaIndexComponent },
      { path: 'proyecto/index', component: ProyectoIndexComponent },
      { path: 'actividad/index', component: ActividadIndexComponent },
      // { path: 'gaceta/create', component: GacetaCreateComponent },
      // { path: 'gaceta/update/:id', component: GacetaUpdateComponent },

      // { path: 'poa/index', component: PoaIndexComponent },
      // { path: 'poa/create', component: PoaCreateComponent },
      // { path: 'poa/update/:id', component: PoaUpdateComponent },

      // { path: 'ptdi/index', component: PtdiIndexComponent },
      // { path: 'ptdi/create', component: PtdiCreateComponent },
      // { path: 'ptdi/update/:id', component: PtdiUpdateComponent },

      { path: '**', redirectTo: 'dashboard' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule { }
