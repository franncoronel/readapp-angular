import { Pipe, PipeTransform } from '@angular/core'
import { Recomendacion } from './domain/recomendacion.domain'
import { coincideConFiltro } from './funciones.pipe'


@Pipe({
  name: 'filtrarBusquedaPrincipal',
  standalone: true
})
export class BusquedaPrincipalPipe implements PipeTransform {

  transform(recomendaciones: Recomendacion[],recomendacionABuscar: string = ''): Recomendacion[] {
    const listaRecomendaciones = recomendaciones.filter(recomendacion => !recomendacionABuscar || coincideConFiltro(recomendacion.titulo, recomendacionABuscar))
    return listaRecomendaciones
  }
}
