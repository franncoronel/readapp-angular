import { Component, Input } from '@angular/core'
import { ElementoDeDominio } from '../../data/validacion'

@Component({
  selector: 'readapp-control-de-errores',
  standalone: true,
  imports: [],
  templateUrl: './control-de-errores.component.html',
  styleUrl: './control-de-errores.component.css'
})
export class ControlDeErroresComponent {
  @Input() elementoDeDominio!: ElementoDeDominio
  @Input() campo!:string
}