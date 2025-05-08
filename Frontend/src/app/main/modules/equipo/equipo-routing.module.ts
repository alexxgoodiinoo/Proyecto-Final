import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableEquipoComponent } from './pages/table-equipo/table-equipo.component';
import { FormEquipoComponent } from './components/form-equipo/form-equipo.component';
import { AdminGuard } from '../../guards/admin.guard';
import { PageEquipoComponent } from './pages/page-equipo/page-equipo.component';
import { PageEquipoInfoComponent } from './pages/page-equipo-info/page-equipo-info.component';

const routes: Routes = [
  {
    path: 'table',
    component: TableEquipoComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'form',
    component: FormEquipoComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'info',
    component: PageEquipoInfoComponent
  },
  {
    path: ':uuid',
    component: PageEquipoComponent
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
export class EquipoRoutingModule {}
