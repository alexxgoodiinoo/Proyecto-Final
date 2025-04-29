import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JugadorRoutingModule } from './jugador-routing.module';
import { TableJugadorComponent } from './pages/table-jugador/table-jugador.component';
import { FormJugadorComponent } from './components/form-jugador/form-jugador.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainModule } from '../../main.module';
import { PageJugadoresInfoComponent } from './pages/page-jugadores-info/page-jugadores-info.component';
import { PageJugadoresComponent } from './pages/page-jugadores/page-jugadores.component';

@NgModule({
  declarations: [
    TableJugadorComponent,
    FormJugadorComponent,
    PageJugadoresComponent,
    PageJugadoresInfoComponent
  ],
  imports: [
    CommonModule,
    JugadorRoutingModule,
    ReactiveFormsModule,
    MainModule
  ]
})
export class JugadorModule { }
