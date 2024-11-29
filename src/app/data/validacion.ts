export type ElementoDeDominio = {
  erroresDe(campo: string): string
  tieneErrores(campo: string): boolean
}

export class MensajeDeValidacion {
    constructor (public campo:string, public mensaje:string) {}
  }