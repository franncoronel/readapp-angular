import { Component, EventEmitter, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'readapp-barra-busqueda-filtro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './barra-busqueda-filtro.component.html',
  styleUrl: './barra-busqueda-filtro.component.css'
})
export class BarraBusquedaFiltroComponent {
  soloPrivadas:boolean = false
  busqueda: string = ''
  @Output() ocultarPrivadas = new EventEmitter<boolean>()
  @Output() nuevaBusqueda = new EventEmitter<string>()

  filtrarRecomendacionesPrivadas(){
    this.soloPrivadas = !this.soloPrivadas
    this.ocultarPrivadas.emit(this.soloPrivadas)
  }

  buscar(){
    this.nuevaBusqueda.emit(this.busqueda)
  }
}
