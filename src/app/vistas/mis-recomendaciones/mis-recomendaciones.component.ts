import { Component } from '@angular/core'
import { BarraBusquedaFiltroComponent } from '../../componentes-aislados/barra-busqueda-filtro/barra-busqueda-filtro.component'
import { RecomendacionService } from '../../data/services/recomendacion.service'
import { Recomendacion } from '../../data/domain/recomendacion.domain'
import { UsuarioService } from '../../data/services/usuario.service'
import { GrillaRecomendacionesComponent } from '../../componentes-aislados/grillas/grilla-recomendaciones/grilla-recomendaciones.component'
import { CommonModule } from '@angular/common'
import { Usuario } from '../../data/domain/usuario.domain'

@Component({
  selector: 'readapp-mis-recomendaciones',
  standalone: true,
  imports: [GrillaRecomendacionesComponent, BarraBusquedaFiltroComponent, CommonModule],
  providers: [RecomendacionService],
  templateUrl: './mis-recomendaciones.component.html',
  styleUrl: './mis-recomendaciones.component.css'
})
export class MisRecomendacionesComponent {
  public recomendaciones! : Recomendacion[]
  filtroVisibilidad: boolean = false
  filtroBusqueda: string = ""
  usuario! : Usuario

  constructor(
    private usuarioService:UsuarioService,
    private recomendacionService : RecomendacionService){}

  async ngOnInit() {
    this.usuario = await this.usuarioService.obtenerUsuarioLogueado()
    this.recomendaciones = await this.recomendacionService.getListaRecomendacionesUsuario(this.usuario.id)
  }

  crearFiltroVisibilidad(estaOculto: boolean){
    this.filtroVisibilidad = estaOculto
  }

  crearFiltroBusqueda(nuevaBusqueda: string){
    this.filtroBusqueda = nuevaBusqueda
  }

  hayRecomendacionEliminada(recomendacion : Recomendacion) {
    this.recomendaciones = this.recomendaciones.filter(r => r.id !== recomendacion.id)
  }
}
