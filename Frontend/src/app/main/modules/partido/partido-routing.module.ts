import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablePartidoComponent } from './pages/table-partido/table-partido.component';
import { FormPartidoComponent } from './components/form-partido/form-partido.component';

const routes: Routes = [
  {
    path: 'table',
    component: TablePartidoComponent
  },
  {
    path: 'form',
    component: FormPartidoComponent
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
export class PartidoRoutingModule { }
