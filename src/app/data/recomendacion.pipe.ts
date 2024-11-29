import { Pipe, PipeTransform } from '@angular/core'
import { Recomendacion } from './domain/recomendacion.domain'

@Pipe({
  name: 'filtrarRecomendacionesPrivadas',
  standalone: true
})
export class RecomendacionPrivadaPipe implements PipeTransform {
  transform(recomendaciones: Recomendacion[], mostrarSoloPrivadas: boolean=false): Recomendacion[] {
    if(!mostrarSoloPrivadas){
        return recomendaciones
    }
    const recosPrivadas = recomendaciones.filter(recomendacion => !recomendacion.publica )  //Tambien puede resolverse haciendo un request al backend, pero como es un codigo simple sirve
    return recosPrivadas   
  }
}
