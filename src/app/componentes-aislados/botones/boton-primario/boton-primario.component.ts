import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'readapp-boton-primario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boton-primario.component.html',
  styleUrl: './boton-primario.component.css'
})
export class BotonPrimarioComponent {
  @Input() verLogin: boolean = false
  @Input() verGuardar: boolean = false
  @Input() verValoracion: boolean = false
}