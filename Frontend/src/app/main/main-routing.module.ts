import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { EntrenadorPageComponent } from './pages/entrenador-page/entrenador-page.component';
import { EntrenadorGuard } from './guards/entrenador.guard';
import { ClasificacionPageComponent } from './pages/clasificacion-page/clasificacion-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'entrenador',
    component: EntrenadorPageComponent,
    canActivate: [EntrenadorGuard],
  },
  {
    path: 'clasificacion',
    component: ClasificacionPageComponent,
  },
  {
    path: 'equipos',
    loadChildren: () =>
      import('./modules/equipo/equipo.module').then((m) => m.EquipoModule),
  },
  {
    path: 'jugadores',
    loadChildren: () =>
      import('./modules/jugador/jugador.module').then((m) => m.JugadorModule),
  },
  {
    path: 'partidos',
    loadChildren: () =>
      import('./modules/partido/partido.module').then((m) => m.PartidoModule),
  },
  {
    path: 'ligas',
    loadChildren: () =>
      import('./modules/liga/liga.module').then((m) => m.LigaModule),
  },
  {
    path: 'usuarios',
    loadChildren: () => 
      import('./modules/usuarios/usuarios.module').then((m) => m.UsuariosModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
