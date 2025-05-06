import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableJugadorComponent } from './pages/table-jugador/table-jugador.component';
import { FormJugadorComponent } from './components/form-jugador/form-jugador.component';
import { PageJugadoresInfoComponent } from './pages/page-jugadores-info/page-jugadores-info.component';
import { AdminGuard } from '../../guards/admin.guard';
import { PageJugadoresComponent } from './pages/page-jugadores/page-jugadores.component';

const routes: Routes = [
  {
    path: 'table',
    component: TableJugadorComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'form',
    component: FormJugadorComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'info',
    component: PageJugadoresInfoComponent
  },
  {
    path: ':uuid',
    component: PageJugadoresComponent
  },
  {
    path: '**',
    redirectTo: 'table',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugadorRoutingModule {}
