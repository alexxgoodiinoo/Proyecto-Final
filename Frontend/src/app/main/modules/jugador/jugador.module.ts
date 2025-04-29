import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JugadorRoutingModule } from './jugador-routing.module';
import { TableJugadorComponent } from './pages/table-jugador/table-jugador.component';
import { FormJugadorComponent } from './components/form-jugador/form-jugador.component';
import { HeaderAdminComponent } from '../../components/header-admin/header-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainModule } from '../../main.module';


@NgModule({
  declarations: [
    TableJugadorComponent,
    FormJugadorComponent
  ],
  imports: [
    CommonModule,
    JugadorRoutingModule,
    ReactiveFormsModule,
    MainModule
  ]
})
export class JugadorModule { }
