import { Component } from '@angular/core';
import { Equipo } from '../../../../interfaces/equipo.interface';
import { Usuario } from '../../../../interfaces/usuario.interface';
import { MainService } from '../../../../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-usuarios',
  standalone: false,
  templateUrl: './table-usuarios.component.html',
})
export class TableUsuariosComponent {
  public filtroNombre: string = '';
  public equipos: Equipo[] = [];
  public equiposSinEntrenador: Equipo[] = [];
  public usuarios: Usuario[] = [];
  editandoUsuarioId: string | null = null;

  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit(): void {
    this.cargarUsuarios();

    this.mainService
      .getEquipos()
      .subscribe((equipo) => (this.equipos = equipo));
  }

  cargarUsuarios() {
    this.mainService
      .getUsuarios()
      .subscribe((usuario) => (this.usuarios = usuario));
  }

  get usuariosFiltrados(): Usuario[] {
    return this.usuarios.filter((usuario) =>
      usuario.username.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

  onEditUsuario(uuid: string) {
    this.editandoUsuarioId = uuid;
  }

  onGuardarUsuario(usuario: Usuario) {
    if (!usuario.id) return;
    this.mainService.updateUsuario(usuario.id, usuario).subscribe({
      next: () => {
        this.editandoUsuarioId = null;
        this.cargarUsuarios();
      },
      error: (err) => {
        console.error('Error al actualizar el usuario', err);
      },
    });
  }

  onCancelarEdicionUsuario() {
    this.editandoUsuarioId = null;
  }

  onDeleteUsuario(uuid: string) {
    this.mainService.deleteUsuario(uuid).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter((e) => e.id !== uuid);
      },
      error: (err) => {
        console.log('Error al eliminar el usuario ', err);
      },
    });
  }
}
