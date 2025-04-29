import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LigaRoutingModule } from './liga-routing.module';
import { TableLigaComponent } from './components/table-liga/table-liga.component';
import { FormLigaComponent } from './components/form-liga/form-liga.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainModule } from '../../main.module';


@NgModule({
  declarations: [
    FormLigaComponent,
    TableLigaComponent
  ],
  imports: [
    CommonModule,
    LigaRoutingModule,
    ReactiveFormsModule,
    MainModule
  ]
})
export class LigaModule { }
