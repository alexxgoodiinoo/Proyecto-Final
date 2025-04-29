import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipoRoutingModule } from './equipo-routing.module';
import { TableEquipoComponent } from './pages/table-equipo/table-equipo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormEquipoComponent } from './components/form-equipo/form-equipo.component';
import { MainModule } from '../../main.module';
import { RouterModule } from '@angular/router';
import { PageEquipoComponent } from './pages/page-equipo/page-equipo.component';


@NgModule({
  declarations: [
    TableEquipoComponent,
    FormEquipoComponent,
    PageEquipoComponent
  ],
  imports: [
    CommonModule,
    EquipoRoutingModule,
    ReactiveFormsModule,
    MainModule,
    RouterModule
  ]
})
export class EquipoModule { }
