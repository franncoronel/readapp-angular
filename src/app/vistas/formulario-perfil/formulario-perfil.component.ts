import { Component } from '@angular/core'
import { CriterioDeBusqueda, TipoLector, Usuario } from '../../data/domain/usuario.domain'
import { FormsModule } from '@angular/forms'
import { CommonModule, NgClass } from '@angular/common'
import { ControlDeErroresComponent } from '../../componentes-aislados/control-de-errores/control-de-errores.component'
import { BotonPrimarioComponent } from '../../componentes-aislados/botones/boton-primario/boton-primario.component'
import { BotonSecundarioComponent } from '../../componentes-aislados/botones/boton-secundario/boton-secundario.component'
import { UsuarioService } from '../../data/services/usuario.service'
import { ComunicacionService } from '../../data/services/comunicacion.service'
// import { usuariosMockProveedor } from '../../mocks/MockProvider'

@Component({
  selector: 'readapp-formulario-perfil',
  standalone: true,
  imports: [FormsModule,NgClass,CommonModule,ControlDeErroresComponent, BotonPrimarioComponent, BotonSecundarioComponent],
  templateUrl: './formulario-perfil.component.html',
  styleUrl: './formulario-perfil.component.css'
})
export class FormularioPerfilComponent {
  /*  
    Estos dos sets están para poder generar el @for en el html, pero ambos tipos con sus respectivos strings están definidos en el dominio.
    Quizás se puede resolver de una manera menos repetitiva, pero no creo que esté mal.
  */
  tiposDeLector:TipoLector[] = ['Promedio','Ansioso','Fanatico','Recurrente']
  criterios:CriterioDeBusqueda[] = ['Precavido','Leedor','Poliglota','Demandante','Nativista','Experimentado','Cambiante','Calculador']

  public usuario!: Usuario

  constructor (private usuarioService : UsuarioService,
              private comunicacionService : ComunicacionService
  ) {}

  async cargarUsuario(unUsuario:Usuario){
    this.usuario = unUsuario
  }

  fechaMinima = new Date(1900,0,1)
  fechaMaxima = this.calcularFechaMaxima(14) //Establezco arbitrariamente que un usuario debe tener mínimo 14 años, se puede cambiar pero me parece sensato para una app de libros

  private calcularFechaMaxima(edadMinima: number) {
    return new Date(new Date().getFullYear() - edadMinima, new Date().getMonth(), new Date().getDay())
  }

  async actualizarCriterios(criterio: CriterioDeBusqueda, click: Event){
    /*
      Este método fue LA duda del día. Sin embargo, no me termina de cerrar.
      La idea es que recibe un evento click, convierte a su "objetivo" en un HTMLInputElement
      Esta interfaz permite consultar algunas propiedades de los elementos input, como si
      un checkbox está tildado o no.
      Luego hay un if muy simple, pero quizás se puede hacer de una manera más objetosa.
      Está por verse. 
    */
    const checkbox = click.target as HTMLInputElement
    const chequeado = checkbox.checked && this.usuario

    if(!chequeado){
      this.usuario.quitarCriterio(criterio)
    }
    else{
      this.usuario.agregarCriterio(criterio)
    }
  }

  guardarCambios(){
    this.usuarioService.guardarUsuario(this.usuario)
    this.comunicacionService.usuarioActualizado()
  }

  cancelarCambios(){
    location.reload()
  }
}
