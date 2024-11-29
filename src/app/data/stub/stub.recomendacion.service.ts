import { Libro } from "../domain/libro.domain"
import { RecomendacionDTO } from "../domain/recomendacion.domain"

export class StubRecomendacionService {
    private libros! : Libro[]
    private recomendaciones! : RecomendacionDTO[]   

    constructor() {
    this.libros = [
        new Libro(12, "Rayuela", "Julio Cortázar", "portada-rayuela.png", 600, 150000, ['ESPANIOL'], 2000000,true,false),
        new Libro(13, "El retrato de Dorian Gray", "Oscar Wilde", "portada-retrato-dorian.jpg", 276, 78000, ['INGLES','ESPANIOL'], 1800000,true,false),
        new Libro(14, "La Odisea", "Homero", "portada-odisea.jpg", 540, 120000, ['INGLES','ESPANIOL'], 950000,true,false),
        new Libro(15, "Orgullo y prejuicio", "Jane Austen", "portada-orgullo-prejuicio.webp", 432, 135000, ['INGLES','ESPANIOL'], 4200000,true,false)
    ]
    
    this.recomendaciones = [
        new RecomendacionDTO(1, 1,false,10, "Recomendación ciencia ficción", "Es un conjunto de libros re copados que se pueden leer en familia. Muy recomendables para niños", true, this.libros,4,[],1,false),
        new RecomendacionDTO(2, 1,false,10, "Recomendación para las vacaciones", "Es un conjunto de libros re copados que se pueden leer en familia. Muy recomendables para niños", true, this.libros,4,[],1,false)
    ]

    }

    getRecomendacion(id: number){
        return this.recomendaciones.find(it => it.id === id)
    }

    getListaRecomendaciones(){
        return this.recomendaciones
    }
    
    getListaRecomendacionesReducida(lim1: number, lim2: number) {
        return this.recomendaciones.slice(lim1, lim2)
    }

}