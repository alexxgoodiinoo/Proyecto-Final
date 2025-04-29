import { Pipe, PipeTransform } from '@angular/core';
import { Equipo } from '../interfaces/equipo.interface';

@Pipe({
  name: 'escudoPipe',
  standalone: false,
})
export class EscudoPipe implements PipeTransform {
  transform(equipo: Equipo): string {
    if (!equipo.escudo) {
      return 'no-escudo.jpg';
    }
    return equipo.escudo;
  }
}