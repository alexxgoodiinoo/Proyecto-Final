import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableJugadorComponent } from './pages/table-jugador/table-jugador.component';
import { FormJugadorComponent } from './components/form-jugador/form-jugador.component';

const routes: Routes = [
  {
    path: 'table',
    component: TableJugadorComponent
  },
  {
    path: 'form',
    component: FormJugadorComponent
  },
  {
    path: '**',
    redirectTo: 'table'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JugadorRoutingModule { }
