import { MensajeDeValidacion } from "../validacion"
import { Libro, LibroDTO } from "./libro.domain"
import { Usuario } from "./usuario.domain"
import { Valoracion } from "./valoracion.domain"

export class EdicionRecomendacionDTO{
  constructor(
    public id: number,
    public titulo: string,
    public publica: boolean,
    public detalle: string,
    public librosRecomendados: Libro[]
  ){}
}

export class RecomendacionDTO {
  constructor (
    public id:number,
    public idCreador:number,
    public esCreador : boolean,
    public tiempoLectura : number,
    public titulo: string,
    public detalle:string,
    public publica: boolean,
    public librosRecomendados: LibroDTO[],
    public cantidadLibros : number,
    public valoraciones: Valoracion[],
    public puntaje:number,
    public puedeValorar : boolean
  ) {}

  // static toDTO(recomendacion:Recomendacion) : RecomendacionDTO {
  //   return Object.assign ( new RecomendacionDTO(
  //     recomendacion.id,
  //     recomendacion.publica,
  //     recomendacion.detalle,
  //     recomendacion.titulo,
  //     recomendacion.librosRecomendados,
  //     recomendacion.valoraciones,
  //     recomendacion.idCreador,
  //     recomendacion.puntaje
  //   ), recomendacion )
  // }
}

export class Recomendacion {
  public errores : MensajeDeValidacion[] = []
  
  constructor(
    public id:number,
    public idCreador:number,
    public esCreador : boolean,
    public tiempoLectura : number,
    public titulo: string,
    public detalle:string,
    public publica: boolean,
    public librosRecomendados: Libro[],
    public cantidadLibros : number,
    public valoraciones: Valoracion[],
    public puntaje:number,
    public puedeValorar : boolean
  ) { }

  static fromDTO(recomendacionDTO: RecomendacionDTO) : Recomendacion {
    return Object.assign(
      new Recomendacion(
      recomendacionDTO.id,
      recomendacionDTO.idCreador,
      recomendacionDTO.esCreador,
      recomendacionDTO.tiempoLectura,
      recomendacionDTO.titulo,
      recomendacionDTO.detalle,
      recomendacionDTO.publica,
      recomendacionDTO.librosRecomendados.map(libroDTO => Libro.fromDTO(libroDTO)),
      recomendacionDTO.cantidadLibros,
      recomendacionDTO.valoraciones.map(valoracion => Valoracion.fromDTO(valoracion)),
      recomendacionDTO.puntaje,
      recomendacionDTO.puedeValorar
      )
    )
  }

  static toDTOEdicionRecomendacion(recomendacion: Recomendacion): EdicionRecomendacionDTO{
    return Object.assign( new EdicionRecomendacionDTO(
      recomendacion.id,
      recomendacion.titulo,
      recomendacion.publica,
      recomendacion.detalle,
      recomendacion.librosRecomendados
    ))
  }

  copia(recomendacionOriginal: Recomendacion) {
    return new Recomendacion(
      recomendacionOriginal.id,
      recomendacionOriginal.idCreador,
      recomendacionOriginal.esCreador,
      recomendacionOriginal.tiempoLectura,
      recomendacionOriginal.titulo,
      recomendacionOriginal.detalle,
      recomendacionOriginal.publica,
      recomendacionOriginal.librosRecomendados.map(libro => ({ ...libro })),
      recomendacionOriginal.cantidadLibros,
      recomendacionOriginal.valoraciones.map(valoracion => valoracion.copia()),
      recomendacionOriginal.puntaje,
      recomendacionOriginal.puedeValorar
    )
  }

  actualizar(copia: Recomendacion) {
    this.titulo = copia.titulo
    this.detalle = copia.detalle
    this.librosRecomendados = copia.librosRecomendados
    this.puntaje = copia.puntaje
    this.valoraciones = copia.valoraciones
    this.publica = copia.publica
  }

  eliminarLibro(libroEliminado : Libro) {
    this.librosRecomendados = this.librosRecomendados.filter(libro => libro.id !== libroEliminado.id)
  }

  agregarValoracion(valoracion:Valoracion) {
    this.valoraciones.push(valoracion)
  }

  yaValoro(usuario:Usuario) {
    return this.valoraciones.some(valoracion => valoracion.idCreador === usuario.id)
  }

    agregarLibro(libro:Libro, usuario:Usuario) {
      const estaLeido = usuario.librosLeidos.some((lib) => lib.id == libro.id)
      if (estaLeido) {
        this.librosRecomendados.push(libro)
      } else {
        this.agregarError("Libros","No puede recomendar un libro que no leyó")
      }
    }
     
    tieneErrores(campo:string) : boolean {
      return this.errores.some((_)=>_.campo == campo)
    }

    erroresDe(campo:string) {
      return this.errores.filter((_)=>_.campo==campo).map((_) => _.mensaje).join(". ")
    }

    agregarError(field:string,message:string){
      this.errores.push(new MensajeDeValidacion(field,message))
    }
    validarRecomendacion() {
      this.errores = []
      if(!this.titulo){
        this.agregarError("Titulo","Debe agregar un titulo a su recomendacion")
      }
      if(!this.detalle) {
        this.agregarError("Descripcion","Debe agregar una descripción")
      }
      if(!this.librosRecomendados || this.librosRecomendados.length == 0) {
        this.agregarError("Libros","No puede dejar el listado de libros vacio")
      }
    }
}

export class RecomendacionValoracionDTO {
  constructor (
    public id:number,
    public valoraciones: Valoracion[] 
  ) {}
}