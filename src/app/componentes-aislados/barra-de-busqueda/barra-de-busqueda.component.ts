import { Component, EventEmitter, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'readapp-barra-de-busqueda',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './barra-de-busqueda.component.html',
  styleUrl: './barra-de-busqueda.component.css'
})
export class BarraDeBusquedaComponent {
  busqueda: string = ''

  @Output() nuevaBusqueda = new EventEmitter<string>() // Esta propiedad output es la que se envía a otros componentes.

  buscar() {
    this.nuevaBusqueda.emit(this.busqueda)
  }
}
