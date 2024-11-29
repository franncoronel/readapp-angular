import { Pipe, PipeTransform } from '@angular/core'
import { Recomendacion } from './domain/recomendacion.domain'
import { coincideConFiltro } from './funciones.pipe'

@Pipe({
  name: 'filtrarMisRecomendaciones',
  standalone: true
})
export class MisRecomendacionesPipe implements PipeTransform {
  transform(misRecomendaciones: Recomendacion[], filtroBusqueda: string = ''): Recomendacion[] {
    const recomendacionesFiltradas = misRecomendaciones.filter(recomendacion => !filtroBusqueda || coincideConFiltro(recomendacion.titulo, filtroBusqueda) || coincideConFiltro(recomendacion.detalle, filtroBusqueda))
    return recomendacionesFiltradas
  }
}
