import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablePartidoComponent } from './pages/table-partido/table-partido.component';
import { FormPartidoComponent } from './components/form-partido/form-partido.component';
import { AdminGuard } from '../../guards/admin.guard';
import { PagePartidoInfoComponent } from './pages/page-partido-info/page-partido-info.component';
import { PagePartidoComponent } from './pages/page-partido/page-partido.component';

const routes: Routes = [
  {
    path: 'table',
    component: TablePartidoComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'form',
    component: FormPartidoComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'info',
    component: PagePartidoInfoComponent,
  },
  {
    path: ':uuid',
    component: PagePartidoComponent,
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
