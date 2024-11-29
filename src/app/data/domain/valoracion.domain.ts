import { MensajeDeValidacion } from "../validacion"

export class ValoracionDTO {
  constructor(
    public valor: number,
    public comentario: string,
    public nombreCreador: string,
    public apellidoCreador: string,
    public usernameCreador: string,
    public fotoCreador: string,
    public idCreador: number) {}
}

export class NuevaValoracionDTO {
  constructor(
    public valor: number,
    public comentario: string,
    public idCreador: number) {}
  
  static toDTO(valoracion : Valoracion) : NuevaValoracionDTO {
    return Object.assign (new NuevaValoracionDTO(
      valoracion.valor,
      valoracion.comentario,
      valoracion.idCreador)
      ,valoracion)
  }
}


export class Valoracion{
    toDTO(): any {
        throw new Error("Method not implemented.")
    }
  errores : MensajeDeValidacion[] = []

    constructor(
      public valor:number,
      public comentario:string,
      public nombreCreador: string,
      public apellidoCreador: string,
      public usernameCreador: string,
      public fotoCreador: string,
      public idCreador: number,
      public fecha:Date
      ) {}
    
    

    static fromDTO(valoracionDTO: ValoracionDTO) : Valoracion {
      return new Valoracion(
          valoracionDTO.valor,  
          valoracionDTO.comentario,
          valoracionDTO.nombreCreador,
          valoracionDTO.apellidoCreador,
          valoracionDTO.usernameCreador,
          valoracionDTO.fotoCreador,
          valoracionDTO.idCreador,          
          new Date() //VER COMO FORMATEAR LA FECHA DESDE UN STRING
        )
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

    validarValoracion() {
      this.errores = []
      if(!this.comentario) {
        this.agregarError("Descripcion", "A esta valoración le falta una descripción")
      }
      if(!this.valor) {
        this.agregarError("Puntaje","Puntaje invalido, la casilla está vacía")
      }
      if(this.valor < 1) {
        this.agregarError("Puntaje","Puntaje invalido, el puntaje debe ser 1 o más")
      }
      if(this.valor > 5) {
        this.agregarError("Puntaje","Puntaje invalido, la casilla debe ser 5 o menos")
      }
    }

    copia() {
      return new Valoracion(
        this.valor,
        this.comentario,
        this.nombreCreador,
        this.apellidoCreador,
        this.usernameCreador,
        this.fotoCreador,
        this.idCreador,
        this.fecha
      )
    }
}