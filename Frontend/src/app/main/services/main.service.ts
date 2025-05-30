import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ApiResponseEquipo, Equipo } from '../interfaces/equipo.interface';
import { ApiResponsePartido, Partido } from '../interfaces/partido.interface';
import { ApiResponseJugador, Jugador } from '../interfaces/jugador.interface';
import { ApiResponseUsuario, Usuario } from '../interfaces/usuario.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  private baseURL: string = environment.baseURL;

  //Equipos
  getEquipos(): Observable<Equipo[]> {
    return this.http.get<ApiResponseEquipo>(`${this.baseURL}/equipos`).pipe(
      map((response) => response.data),
      catchError(() => of([]))
    );
  }

  getUnEquipo(uuid: string): Observable<Equipo> {
    return this.http
      .get<ApiResponseEquipo>(`${this.baseURL}/equipos/${uuid}`)
      .pipe(
        map((response) => response.data[0]),
        catchError((error) =>
          throwError(() => new Error('Error al obtener el equipo'))
        )
      );
  }

  getTeamPlayers(uuid: string): Observable<Jugador[]> {
    return this.http
      .get<ApiResponseJugador>(`${this.baseURL}/equipos/${uuid}/jugadores`)
      .pipe(
        map((response) => response.data),
        catchError(() => of([]))
      );
  }

  newEquipo(equipo: any) {
    return this.http.post(`${this.baseURL}/equipos/`, equipo);
  }

  updateEquipo(uuid: string, equipo: any) {
    console.log('HOLA ', `${this.baseURL}/equipos/${uuid}`);
    return this.http.patch(`${this.baseURL}/equipos/${uuid}`, equipo);
  }

  deleteEquipo(uuid: string) {
    return this.http.delete(`${this.baseURL}/equipos/${uuid}`);
  }

  //Jugadores
  getJugadores(): Observable<Jugador[]> {
    return this.http.get<ApiResponseJugador>(`${this.baseURL}/jugadores`).pipe(
      map((response) => response.data),
      catchError(() => of([]))
    );
  }

  getUnJugador(uuid: string): Observable<Jugador> {
    return this.http
      .get<ApiResponseJugador>(`${this.baseURL}/jugadores/${uuid}`)
      .pipe(
        map((response) => response.data[0]),
        catchError((error) =>
          throwError(() => new Error('Error al obtener el jugador'))
        )
      );
  }

  newJugador(jugador: any) {
    console.log(jugador);
    return this.http.post(`${this.baseURL}/jugadores/`, jugador);
  }

  updateJugador(uuid: string, jugador: any) {
    console.log(jugador);
    return this.http.patch(`${this.baseURL}/jugadores/${uuid}`, jugador);
  }

  deleteJugador(uuid: string) {
    return this.http.delete(`${this.baseURL}/jugadores/${uuid}`);
  }

  //Partidos
  getPartidos(): Observable<Partido[]> {
    return this.http.get<ApiResponsePartido>(`${this.baseURL}/partidos`).pipe(
      map((response) => response.data),
      catchError(() => of([]))
    );
  }

  getUnPartido(uuid: string): Observable<Partido> {
    return this.http
      .get<ApiResponsePartido>(`${this.baseURL}/partidos/${uuid}`)
      .pipe(
        map((response) => response.data[0]),
        catchError((error) =>
          throwError(() => new Error('Error al obtener el partido'))
        )
      );
  }

  newPartido(partido: any) {
    return this.http.post(`${this.baseURL}/partidos/`, partido);
  }

  updatePartido(uuid: string, partido: any) {
    return this.http.patch(`${this.baseURL}/partidos/${uuid}`, partido);
  }

  deletePartido(uuid: string) {
    return this.http.delete(`${this.baseURL}/partidos/${uuid}`);
  }

  //Usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<ApiResponseUsuario>(`${this.baseURL}/usuarios`).pipe(
      map((response) => response.data),
      catchError(() => of([]))
    );
  }

  updateUsuario(uuid: string, usuario: any) {
    return this.http.patch(`${this.baseURL}/usuarios/${uuid}`, usuario);
  }

  deleteUsuario(uuid: string) {
    return this.http.delete(`${this.baseURL}/usuarios/${uuid}`);
  }
}
