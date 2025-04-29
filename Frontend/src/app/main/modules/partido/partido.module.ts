import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartidoRoutingModule } from './partido-routing.module';
import { TablePartidoComponent } from './pages/table-partido/table-partido.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormPartidoComponent } from './components/form-partido/form-partido.component';
import { MainModule } from '../../main.module';


@NgModule({
  declarations: [
    TablePartidoComponent,
    FormPartidoComponent
  ],
  imports: [
    CommonModule,
    PartidoRoutingModule,
    ReactiveFormsModule,
    MainModule
  ]
})
export class PartidoModule { }
