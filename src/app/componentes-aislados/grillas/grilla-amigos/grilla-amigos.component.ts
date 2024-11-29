import { Component, EventEmitter, Input, Output } from '@angular/core'
import { BotonComponent } from '../../botones/boton-agregar/boton.component'
import { TarjetaAmigoComponent } from '../../tarjeta-amigo/tarjeta-amigo.component'
import { AmigoDTO } from '../../../data/domain/usuario.domain'
import { UsuarioService } from '../../../data/services/usuario.service'

@Component({
  selector: 'readapp-grilla-amigos',
  standalone: true,
  imports: [TarjetaAmigoComponent,BotonComponent],
  templateUrl: './grilla-amigos.component.html',
  styleUrl: './grilla-amigos.component.css'
})
export class GrillaAmigosComponent {
  @Input() amigos!:AmigoDTO[]
  @Output() amigoAEliminar = new EventEmitter<AmigoDTO>()
  constructor(private usuarioService:UsuarioService){}
  async ngOnInit() {
      const datosDeUsuario = await this.usuarioService.obtenerUsuarioLogueado()
      this.amigos = datosDeUsuario.amigos
  }
  
  agregarAmigo() {
    //NO HAY UNA VISTA PARA AGREGAR AMIGOS
  }

  eliminarAmigo(amigo:AmigoDTO) {
    this.amigoAEliminar.emit(amigo)
  }
}
