import { Pipe, PipeTransform } from '@angular/core'
import { Libro } from './domain/libro.domain'
import { coincideConFiltro } from './funciones.pipe'

@Pipe({
  name: 'filtrarLibros',
  standalone: true
})
export class LibroPipe implements PipeTransform {
  transform(libros: Libro[], filtroBusqueda: string = ''): Libro[] {
    const librosFiltrados = libros.filter (libro => !filtroBusqueda || coincideConFiltro(libro.titulo, filtroBusqueda) || coincideConFiltro(libro.autor, filtroBusqueda))
    return librosFiltrados
  }
}
