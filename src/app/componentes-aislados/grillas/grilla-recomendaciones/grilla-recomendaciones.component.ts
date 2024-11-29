import { Component, EventEmitter, Input, Output } from '@angular/core'
import { TarjetaRecomendacionComponent } from '../../tarjeta-recomendacion/tarjeta-recomendacion.component'
import { Recomendacion } from '../../../data/domain/recomendacion.domain'
import { RecomendacionPrivadaPipe } from '../../../data/recomendacion.pipe'
import { CommonModule } from '@angular/common'
import { MisRecomendacionesPipe } from '../../../data/mis-recomendaciones.pipe'
import { Usuario } from '../../../data/domain/usuario.domain'
import { BusquedaPrincipalPipe } from "../../../data/busqueda-principal.pipe"

@Component({
  selector: 'readapp-grilla-recomendaciones',
  standalone: true,
  imports: [TarjetaRecomendacionComponent, RecomendacionPrivadaPipe, MisRecomendacionesPipe, CommonModule, BusquedaPrincipalPipe],
  templateUrl: './grilla-recomendaciones.component.html',
  styleUrl: './grilla-recomendaciones.component.css'
})
export class GrillaRecomendacionesComponent {
  @Input() usuario! :Usuario
  @Input() recomendaciones!:Recomendacion[]
  @Input() mostrarSoloPrivadas:boolean=false
  @Input() filtroBusqueda:string = ""
  @Output() recomendacionEliminada = new EventEmitter<Recomendacion>()

  hayRecomendacionEliminada(recomendacion : Recomendacion) {
    this.recomendacionEliminada.emit(recomendacion)
  }

}