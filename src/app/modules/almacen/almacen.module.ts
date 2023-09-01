import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriaIndexComponent } from './pages/categorias/categoria-index/categoria-index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramaIndexComponent } from './pages/programas/programa-index/programa-index.component';
import { ProyectoIndexComponent } from './pages/proyectos/proyecto-index/proyecto-index.component';
import { ActividadIndexComponent } from './pages/actividades/actividad-index/actividad-index.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { ProveedorIndexComponent } from './pages/proveedores/proveedor-index/proveedor-index.component';
import { ArticuloIndexComponent } from './pages/articulos/articulo-index/articulo-index.component';
import { ArticuloCreateComponent } from './pages/articulos/articulo-create/articulo-create.component';
import { CompraCreateComponent } from './pages/compras/compra-create/compra-create.component';
import { CompraIndexComponent } from './pages/compras/compra-index/compra-index.component';
import { EgresoIndexComponent } from './pages/egresos/egreso-index/egreso-index.component';
import { EgresoCreateComponent } from './pages/egresos/egreso-create/egreso-create.component';
import { CompraUpdateComponent } from './pages/compras/compra-update/compra-update.component';
import { MedidaIndexComponent } from './pages/medidas/medida-index/medida-index.component';
import { MedidaEditComponent } from './pages/medidas/medida-edit/medida-edit.component';
import { VehiculoIndexComponent } from './pages/vehiculos/vehiculo-index/vehiculo-index.component';
import { ReportIndexComponent } from './pages/report/report-index/report-index.component';
import { ReportIngresoComponent } from './pages/report/report-ingreso/report-ingreso.component';
import { ReportEntradasComponent } from './pages/report/report-entradas/report-entradas.component';
import { ReportArticulosComponent } from './pages/report/report-articulos/report-articulos.component';




@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CategoriaIndexComponent,
    ProgramaIndexComponent,
    ProyectoIndexComponent,
    ActividadIndexComponent,
    ProveedorIndexComponent,
    ArticuloIndexComponent,
    ArticuloCreateComponent,
    CompraCreateComponent,
    CompraIndexComponent,
    EgresoIndexComponent,
    EgresoCreateComponent,
    CompraUpdateComponent,
    MedidaIndexComponent,
    MedidaEditComponent,
    VehiculoIndexComponent,
    ReportIndexComponent,
    ReportIngresoComponent,
    ReportEntradasComponent,
    ReportArticulosComponent,
  ],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    ReactiveFormsModule,
    NgxSelectModule,
    FormsModule
  ]
})
export class AlmacenModule { }
