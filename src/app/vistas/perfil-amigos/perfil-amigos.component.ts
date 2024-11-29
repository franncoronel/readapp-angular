import { Component } from '@angular/core'
import { TarjetaAmigoComponent } from "../../componentes-aislados/tarjeta-amigo/tarjeta-amigo.component"
import { GrillaAmigosComponent } from "../../componentes-aislados/grillas/grilla-amigos/grilla-amigos.component"
import { AmigoDTO, Usuario } from '../../data/domain/usuario.domain'
import { UsuarioService } from '../../data/services/usuario.service'

@Component({
  selector: 'readapp-perfil-amigos',
  standalone: true,
  imports: [TarjetaAmigoComponent, GrillaAmigosComponent],
  templateUrl: './perfil-amigos.component.html',
  styleUrl: './perfil-amigos.component.css'
})
export class PerfilAmigosComponent {
  private usuario! : Usuario
  public amigos:AmigoDTO[] = []

  constructor (private usuarioService : UsuarioService) {}

  async cargarUsuario(unUsuario:Usuario) {
    this.usuario = unUsuario
    this.amigos = this.usuario.amigos
  }

  eliminarAmigo(amigo:AmigoDTO){
    this.usuario.quitarAmigo(amigo)
    this.amigos = [...this.usuario.amigos] 
    this.usuarioService.actualizarAmigos(this.usuario)
  }
}