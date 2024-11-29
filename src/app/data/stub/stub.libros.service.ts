import { Libro } from "../domain/libro.domain"

export class StubLibroService {
    private libros: Libro[]

    constructor() {
        const rayuela = new Libro(1, "Rayuela", "Julio Cortázar", "portada-rayuela.png", 600, 150000, ["Español"], 2000000,false,false)
        const odisea = new Libro(2, "La Odisea", "Homero", "portada-odisea.jpg", 540, 120000, ["Griego, Español, Inglés"], 950000,true,true)
        this.libros = [
            rayuela,
            odisea
        ]
    }

    getLibro(id:number){
        return this.libros.find(it => it.id === id)
    }

    getListaLibros() { /* Devuelve toda una lista de libros */
        return this.libros
    }

    getListaLibrosReducida(lim1: number, lim2: number) {
        return this.libros.slice(lim1, lim2)
    }
}