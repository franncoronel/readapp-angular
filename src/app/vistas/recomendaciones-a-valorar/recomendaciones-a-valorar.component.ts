import { Component } from '@angular/core'
import { Recomendacion } from '../../data/domain/recomendacion.domain'
import { GrillaRecomendacionesComponent } from '../../componentes-aislados/grillas/grilla-recomendaciones/grilla-recomendaciones.component'
import { Usuario } from '../../data/domain/usuario.domain'

@Component({
  selector: 'readapp-recomendaciones-a-valorar',
  standalone: true,
  imports: [GrillaRecomendacionesComponent],
  templateUrl: './recomendaciones-a-valorar.component.html',
  styleUrl: './recomendaciones-a-valorar.component.css'
})
export class RecomendacionesAValorarComponent {
  public usuario!:Usuario
  public recomendaciones:Recomendacion[] = []
 
  async cargarUsuario(unUsuario:Usuario) {
    this.usuario = unUsuario
    this.recomendaciones = unUsuario.recomendacionesAValorar
  }
}