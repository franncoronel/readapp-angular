import { Component, Input } from '@angular/core'
import { BotonComponent } from '../../botones/boton-agregar/boton.component'
import { TarjetaValoracionComponent } from '../../tarjeta-valoracion/tarjeta-valoracion.component'
import { Valoracion } from '../../../data/domain/valoracion.domain'
import { Recomendacion } from '../../../data/domain/recomendacion.domain'
import { RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'readapp-grilla-valoraciones',
  standalone: true,
  imports: [CommonModule, TarjetaValoracionComponent, BotonComponent, RouterLink],
  templateUrl: './grilla-valoraciones.component.html',
  styleUrl: './grilla-valoraciones.component.css'
})
export class GrillaValoracionesComponent {
  @Input() recomendacion!:Recomendacion
  @Input() valoraciones!:Valoracion[]
  @Input() mostrarBoton : boolean = false

  }

