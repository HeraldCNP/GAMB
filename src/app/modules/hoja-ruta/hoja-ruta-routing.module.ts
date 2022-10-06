import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OfficeIndexComponent } from './pages/myOffice/office-index/office-index.component';
import { DerivarSeguimientoComponent } from './pages/derivar-seguimiento/derivar-seguimiento.component';
import { HojarutasComponent } from './pages/hojarutas/hojarutas.component';
import { HomeComponent } from './pages/home/home.component';
import { AsociarComponent } from './pages/asociar/asociar.component';
import { EditHojaComponent } from './pages/edit-hoja/edit-hoja.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children:[
      {path: '', component: HomeComponent},
      {path: 'office/index', component: OfficeIndexComponent},
      {path: 'hojaRutas', component: HojarutasComponent},
      {path: 'asociar/:nuit', component: AsociarComponent},
      {path: 'editHoja/:id', component: EditHojaComponent},
      {path: 'derivar/:idHr/:idSegui', component: DerivarSeguimientoComponent},
      {path: 'derivar/:idHr', component: DerivarSeguimientoComponent},
      {path: '**', redirectTo:'dashboard', pathMatch: 'full'},
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HojaRutaRoutingModule { }
