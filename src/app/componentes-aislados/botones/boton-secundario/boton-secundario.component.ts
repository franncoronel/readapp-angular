import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'readapp-boton-secundario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boton-secundario.component.html',
  styleUrl: './boton-secundario.component.css'
})
export class BotonSecundarioComponent {
  @Input() verCancelar: boolean = false
  @Input() verVolver: boolean = false
}