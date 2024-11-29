import { Component } from '@angular/core'
import { AsidePerfilComponent } from "../../componentes-aislados/aside-perfil/aside-perfil.component"
import { RouterOutlet } from '@angular/router'
import { BotonPrimarioComponent } from '../../componentes-aislados/botones/boton-primario/boton-primario.component'
import { BotonSecundarioComponent } from '../../componentes-aislados/botones/boton-secundario/boton-secundario.component'
import { Usuario } from '../../data/domain/usuario.domain'
import { UsuarioService } from '../../data/services/usuario.service'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'readapp-vista-perfil',
  standalone: true,
  imports: [CommonModule,AsidePerfilComponent, RouterOutlet, BotonPrimarioComponent, BotonSecundarioComponent],
  templateUrl: './vista-perfil.component.html',
  styleUrl: './vista-perfil.component.css'
})
export class VistaPerfilComponent {
  usuario! : Usuario
  constructor(private usuarioService:UsuarioService){}

  async ngOnInit(){
    await this.cargarUsuario()
  }

  async cargarUsuario(){
    this.usuario = await this.usuarioService.obtenerUsuarioLogueado()
  }

  async cargarAlOutlet(component:any){
    component.cargarUsuario(this.usuario)
  }
}
