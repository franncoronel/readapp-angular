import { Component, Input } from '@angular/core'
import { Valoracion } from '../../data/domain/valoracion.domain'

@Component({
  selector: 'readapp-tarjeta-valoracion',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-valoracion.component.html',
  styleUrl: './tarjeta-valoracion.component.css'
})
export class TarjetaValoracionComponent {
  @Input() valoracion!: Valoracion
  
  fechaFormateada(fecha: Date) : string {
    return fecha.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }
}