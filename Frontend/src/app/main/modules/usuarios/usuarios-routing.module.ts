import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableEquipoComponent } from '../equipo/pages/table-equipo/table-equipo.component';
import { AdminGuard } from '../../guards/admin.guard';
import { TableUsuariosComponent } from './pages/table-usuarios/table-usuarios.component';

const routes: Routes = [
  {
    path: 'table',
    component: TableUsuariosComponent,
    canActivate: [AdminGuard],
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
export class UsuariosRoutingModule {}
