import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MainModule } from '../../main.module';
import { TableUsuariosComponent } from './pages/table-usuarios/table-usuarios.component';


@NgModule({
  declarations: [
    TableUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MainModule
  ]
})
export class UsuariosModule { }
