import { Pipe, PipeTransform } from '@angular/core';
import { Jugador } from '../interfaces/jugador.interface';

@Pipe({
  name: 'imagenJugadorPipe',
  standalone: false,
})
export class ImagenJugadorPipe implements PipeTransform {
  transform(jugador: Jugador): string {
    if (!jugador.imagen) {
      return 'no-image.jpg';
    }
    return jugador.imagen;
  }
}
