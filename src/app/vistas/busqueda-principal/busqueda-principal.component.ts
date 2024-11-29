import { Component } from '@angular/core'
import { BarraDeBusquedaComponent } from "../../componentes-aislados/barra-de-busqueda/barra-de-busqueda.component"
import { RecomendacionService } from '../../data/services/recomendacion.service'
import { Recomendacion } from '../../data/domain/recomendacion.domain'
import { GrillaRecomendacionesComponent } from '../../componentes-aislados/grillas/grilla-recomendaciones/grilla-recomendaciones.component'
import { CommonModule } from '@angular/common'
import { UsuarioService } from '../../data/services/usuario.service'
import { Usuario } from '../../data/domain/usuario.domain'

@Component({
  selector: 'readapp-busqueda-principal',
  standalone: true,
  imports: [GrillaRecomendacionesComponent, BarraDeBusquedaComponent, CommonModule],
  providers: [RecomendacionService],
  templateUrl: './busqueda-principal.component.html',
  styleUrl: './busqueda-principal.component.css'
})
export class BusquedaPrincipalComponent {
  public usuarioLogueado! : Usuario
  public recomendaciones! : Recomendacion[]
  filtroBusqueda : string = ""
  
  constructor(private recomendacionService:RecomendacionService,
              private usuarioService : UsuarioService){}

  async ngOnInit() {
    this.usuarioLogueado = await this.usuarioService.obtenerUsuarioLogueado()
    this.recomendaciones = await this.recomendacionService.getListaRecomendacionesPorCriterio(this.usuarioLogueado.id)
  }

  crearFiltroBusqueda(nuevaBusqueda: string){
    this.filtroBusqueda = nuevaBusqueda
  }

  hayRecomendacionEliminada(recomendacion : Recomendacion) {
    this.recomendaciones = this.recomendaciones.filter(r => r.id !== recomendacion.id)
  }
}
