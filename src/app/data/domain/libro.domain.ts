export class LibroDTO {
  constructor(
    public id: number,
    public titulo: string,
    public autor: Autor,
    public imagen: string,
    public paginas: number,
    public palabras: number,
    public idiomas: string[],
    public ventasSemanales: number,
    public bestSeller: boolean,
    public desafiante: boolean,
  ){}
  
}
export class Libro {
  constructor(
    public id: number,
    public titulo: string,
    public autor: string,
    public imagen: string,
    public paginas: number,
    public palabras: number,
    public idiomas: string[],
    public ventasSemanales: number,
    public bestSeller: boolean,
    public desafiante: boolean
  ) {}

  static fromDTO(libroDTO: LibroDTO): Libro {
    console.info(libroDTO.autor)
    return Object.assign(
      new Libro(
        libroDTO.id,
        libroDTO.titulo,
        libroDTO.autor.nombre,
        libroDTO.imagen,
        libroDTO.paginas,
        libroDTO.palabras,
        libroDTO.idiomas,
        libroDTO.ventasSemanales,
        libroDTO.bestSeller,
        libroDTO.desafiante
      ),
      libroDTO,
      {
        autor: libroDTO.autor.nombre.concat(" " + libroDTO.autor.apellido)
      }
    )
  }
}

export type Autor = {
  nombre : string,
  apellido : string
}
