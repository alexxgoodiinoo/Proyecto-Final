import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartidoRoutingModule } from './partido-routing.module';
import { TablePartidoComponent } from './pages/table-partido/table-partido.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormPartidoComponent } from './components/form-partido/form-partido.component';
import { MainModule } from '../../main.module';
import { PagePartidoInfoComponent } from './pages/page-partido-info/page-partido-info.component';
import { PagePartidoComponent } from './pages/page-partido/page-partido.component';


@NgModule({
  declarations: [
    TablePartidoComponent,
    FormPartidoComponent,
    PagePartidoInfoComponent,
    PagePartidoComponent
  ],
  imports: [
    CommonModule,
    PartidoRoutingModule,
    ReactiveFormsModule,
    MainModule
  ]
})
export class PartidoModule { }
