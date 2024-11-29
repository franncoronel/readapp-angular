import { Recomendacion, RecomendacionDTO } from "./recomendacion.domain"
import { Libro, LibroDTO } from "./libro.domain"
import { MensajeDeValidacion } from "../validacion"
import { FORMATO_FECHA } from "../services/configuracion"
import { DateTime } from 'luxon'

export class  UsuarioDTO { //DTO que le llega del back
  constructor (
  public id: number,
  public nombre: string,
  public apellido: string,
  public username: string,
  public fotoPerfil: string,
  public email: string,
  public tipoLector: TipoLector,
  public criterioDeBusqueda: string[],
  public password: string,
  public palabrasPorMinuto: number,
  public recomendacionesAValorar:RecomendacionDTO[],
  public librosLeidos:LibroDTO[],
  public librosALeer:LibroDTO[],
  public amigos: AmigoDTO[],
  public minimo: number,
  public maximo : number,
  public fechaNacimiento?: string) {}
}

export class UsuarioFormularioDTO{ //DTO que envia al back
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public username: string,
    public email: string,
    public tipoLector: TipoLector,
    public criterioDeBusqueda: string[],
    public palabrasPorMinuto: number,
    public minimo: number,
    public maximo : number,
    public fechaNacimiento?: string
  ){}
}



export class Usuario {
  public errores: MensajeDeValidacion[] = []
    constructor(
      public id: number,
      public nombre: string,
      public apellido: string,
      public username: string,
      public password: string,
      public fechaNacimiento: Date,
      public email: string,
      public palabrasPorMinuto: number,
      public tipoLector: TipoLector = 'Promedio',
      public criterioDeBusqueda: string[],
      public recomendacionesAValorar:Recomendacion[],
      public librosLeidos:Libro[],
      public librosALeer:Libro[],
      public foto:string,
      public amigos:AmigoDTO[],
      public minimo: number,
      public maximo : number,
    ) {}

  static fromDTO(usuarioDTO: UsuarioDTO): Usuario {
    return Object.assign(
      new Usuario(
        usuarioDTO.id,
        usuarioDTO.nombre,
        usuarioDTO.apellido,
        usuarioDTO.username,
        usuarioDTO.password,
        usuarioDTO.fechaNacimiento? DateTime.fromFormat(usuarioDTO.fechaNacimiento, FORMATO_FECHA).toJSDate() : new Date(), // Asegúrate de que sea un objeto Date
        usuarioDTO.email,
        usuarioDTO.palabrasPorMinuto,
        usuarioDTO.tipoLector,
        usuarioDTO.criterioDeBusqueda, // Convierte a Set si es necesario
        usuarioDTO.recomendacionesAValorar.map(recomendacion => Recomendacion.fromDTO(recomendacion)),
        usuarioDTO.librosLeidos.map(libroDTO => Libro.fromDTO(libroDTO)),
        usuarioDTO.librosALeer.map(libroDTO => Libro.fromDTO(libroDTO)),
        usuarioDTO.fotoPerfil,
        usuarioDTO.amigos,
        usuarioDTO.minimo,
        usuarioDTO.maximo
      )
    )
  }

  toDTO(usuario:Usuario) : UsuarioFormularioDTO {
    return Object.assign(
      new UsuarioFormularioDTO(
        usuario.id,
        usuario.nombre,
        usuario.apellido,
        usuario.username,
        usuario.email,
        usuario.tipoLector,
        Array.from(usuario.criterioDeBusqueda),
        usuario.palabrasPorMinuto,
        usuario.minimo,
        usuario.maximo,
      ),usuario,
     {
     fechaNacimiento: usuario.fechaNacimiento ? usuario.transformarFechaAString() :undefined
     }
  )
  }
  
    esValido(): boolean {
      return this.username.length > 4 && this.password.length > 5
    }

    //Funciones para chequear errores
    tieneErrores(campo:string) : boolean {
      return this.errores.some((_)=>_.campo == campo)
    }

    erroresDe(campo:string) {
      return this.errores.filter((_)=>_.campo==campo).map((_) => _.mensaje).join(". ")
    }

    agregarError(field:string,message:string){
      this.errores.push(new MensajeDeValidacion(field,message))
    }

    validarUsuario() {
      this.errores = []
      const ahora = new Date()
      ahora.setHours(0, 0, 0, 0)
      if (!this.fechaNacimiento) {
        this.agregarError('Fecha', 'Debe ingresar una fecha de nacimiento')
      }
      if (!this.nombre){
        {this.agregarError("Nombre", "Debe agregar su nombre")
        }
      }
      if (!this.apellido){
        {this.agregarError("Apellido", "Debe agregar su apellido")
        }
      }
      if (!this.username){
        {this.agregarError("Username", "Debe agregar su nombre de usuario")
        }
      }
      if (!this.email){
        {this.agregarError("Correo", "Debe ingresar un correo electronico")
        }
      }
      if (!this.email.includes("@")) {
        {this.agregarError("Correo", "Correo no valido, quizá olvidó agregar '@'")
        } 
      }
      if (!this.palabrasPorMinuto) {
        {
          this.agregarError("PalabrasPorMinuto", "Debe ingresar cuantas palabras puede leer por minuto")
        }
      }
      if (!this.tipoLector){
        this.agregarError("TipoLector","Debe ingresar su tipo de lector")
      }
      if (this.criterioDeBusqueda.length==0){
        this.agregarError("Criterios","Debe ingresar al menos un criterio de busqueda")
      }
    }

    quitarAmigo(amigoEliminado : AmigoDTO){
      const amigos = this.amigos.filter(amigo=>amigo.id!=amigoEliminado.id)
      this.amigos = amigos
    }

    //Métodos para modificar el set de criterios de búsqueda y poder sincronizarlo con lo renderizado en la vista.

    agregarCriterio(criterio: CriterioDeBusqueda){
      this.criterioDeBusqueda.push(criterio)
    }
  
    quitarCriterio(criterioEliminado: CriterioDeBusqueda){
      this.criterioDeBusqueda = this.criterioDeBusqueda.filter(criterio => criterio!==criterioEliminado)
    }
    
    contieneCriterio(criterio: CriterioDeBusqueda){
      return this.criterioDeBusqueda.includes(criterio)
    }

    transformarFechaAString(): string {
      console.info(this.fechaNacimiento)
      return DateTime.fromJSDate(this.fechaNacimiento).toUTC().toFormat(FORMATO_FECHA)
    }

    yaEstaParaValorar(recomendacion:Recomendacion) {
      return this.recomendacionesAValorar.find(r => r.id == recomendacion.id)
    }

    agregarLibroLeido(libroAgregado: Libro) {
      const index = this.librosALeer.findIndex(libro => libro.id === libroAgregado.id)
      if (index !== -1) {
        this.librosALeer.splice(index, 1)
      }    
      this.librosLeidos.push(libroAgregado)
    }

    agregarLibroALeer(libroAgregado: Libro) {
      const libroYaLeido = this.librosLeidos.some(libro => libro.id === libroAgregado.id)
      if (!libroYaLeido) {
        this.librosALeer.push(libroAgregado)
      }
    }

    sacarLibroLeido(libroEliminado : Libro) {
      this.librosLeidos = this.librosLeidos.filter(libro => libro.id !== libroEliminado.id)
    }

    sacarLibroALeer(libroEliminado : Libro) {
      this.librosALeer = this.librosALeer.filter(libro => libro.id !== libroEliminado.id)      
    }

    //Tanto agregar como sacar recomendacion, una vez que modifican el objeto del front deberian realizar una actializacion en el back
    //usando el PUT del usuario
    agregarRecomendacionAValorar(recomendacion:Recomendacion) {
      this.recomendacionesAValorar.push(recomendacion)      
    }

    sacarRecomendacionAValorar(recomendacion:Recomendacion) {      
      const index = this.recomendacionesAValorar.findIndex(reco => reco.id === recomendacion.id)
      this.recomendacionesAValorar.splice(index, 1)
    }
  
  }

export class AmigoDTO  {
    constructor(
      public id: number,
      public nombre: string,
      public apellido: string,
      public username: string,
      public foto: string) {}
}

export class UsuarioValidacionDTO{
  constructor(
    public username: string,
    public id: number,
    public rol: string
  ){}
}

export type TipoLector = 'Promedio' | 'Ansioso' | 'Fanatico' | 'Recurrente'

export type CriterioDeBusqueda = 'Precavido' | 'Leedor' | 'Poliglota' | 'Demandante' | 'Nativista' | 'Experimentado' | 'Cambiante' | 'Calculador'

