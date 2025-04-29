import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { EntrenadorPageComponent } from './pages/entrenador-page/entrenador-page.component';
import { HeaderComponent } from './components/header-normal/header.component';
import { ClasificacionPageComponent } from './pages/clasificacion-page/clasificacion-page.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EscudoPipe } from './pipe/escudo.pipe';
import { ImagenJugadorPipe } from './pipe/imagen-jugador.pipe';

@NgModule({
  declarations: [
    MainPageComponent,
    EntrenadorPageComponent,
    HeaderComponent,
    HeaderAdminComponent,
    ClasificacionPageComponent,
    EscudoPipe,
    ImagenJugadorPipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    HeaderAdminComponent,
    EscudoPipe,
    ImagenJugadorPipe,
    FormsModule
  ]
})
export class MainModule { }
