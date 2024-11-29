import { recomendacionPrivada, recomendacionPublica } from '../mocks/MockProvider'
import { MisRecomendacionesPipe } from './mis-recomendaciones.pipe'

const recomendaciones = [recomendacionPrivada, recomendacionPublica]
const pipe = new MisRecomendacionesPipe()

describe('MisRecomendacionesPipe', () => {
  it('create an instance', () => {
    const pipe = new MisRecomendacionesPipe()
    expect(pipe).toBeTruthy()
  })

  it('devuelve la lista original si no se ingresa ningun parametro', () => {
    const recomendacionesFiltradas = pipe.transform(recomendaciones)
    expect(recomendacionesFiltradas.length).toBe(2)
  })

  it('devuelve la recomendación pública si recibe publica como parámetro', () => {
    const recomendacionesFiltradas = pipe.transform(recomendaciones, "publica")
    expect(recomendacionesFiltradas.length).toBe(1)
  })
})
