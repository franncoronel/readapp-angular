import { Libro } from './domain/libro.domain'
import { LibroPipe } from './libro.pipe'

        const rayuela = new Libro(1, "Rayuela", "Julio Cortázar", "portada-rayuela.png", 600, 150000, ['ESPANIOL'], 2000000,true,true)
        const odisea = new Libro(2, "La Odisea", "Homero", "portada-odisea.jpg", 540, 120000, ['INGLES','ESPANIOL'], 950000,true,true)
        const libros = [rayuela, odisea]

describe('LibroPipe', () => {
  const pipe = new LibroPipe()
  it('crea una instancia', () => {
    expect(pipe).toBeTruthy()
  })
  it('devuelve la lista original si no se ingresa un parámetro de búsqueda', () => {
    const librosFiltrados = pipe.transform(libros)
    expect(librosFiltrados.length).toBe(2)
  })
  it('devuelve los libros cuyo título corresponde al parámetro ingresado', () => {
    const listaRayuela = pipe.transform(libros, "RAY")
    expect(listaRayuela.length).toBe(1)
    expect(listaRayuela).toContain(rayuela)
  })
  it('devuelve los libros cuyo autor corresponde al parámetro ingresado', () => {
    const listaOdisea = pipe.transform(libros, "homero")
    expect(listaOdisea.length).toBe(1)
    expect(listaOdisea).toContain(odisea)
  })
})
