import { of } from "rxjs"
import { LibroDTO } from "../domain/libro.domain"
import { Usuario, UsuarioDTO, UsuarioFormularioDTO } from "../domain/usuario.domain"
import { URL_SERVIDOR_REST } from "./configuracion"


export const usuarioDTODelBack = new UsuarioDTO (
  1,
  "Roman",
  "Polanski",
  "Chinatown",
  "mono.png",
  "rpolanski@gmail",
  "Recurrente",
  ["Calculador"],
  "onetwoseventhree",
  100,
  [],
  [],
  [],
  [],
  0,
  50
)

export const usuarioConDatosDeFormulario = new Usuario(
  1,
  "Hedy",
  "Lamarr",
  "hdlmr",
  "80211",
  new Date(),
  "hdlamarr@gmail",
  100,
  "Ansioso",
  ["Poliglota"],
  [],
  [],
  [],
  "mono.png",
  [],
  0,
  0
)

export const usuarioDelBack = Usuario.fromDTO(usuarioDTODelBack)

export const usuarioConDatosDeFormularioDTO : UsuarioFormularioDTO = usuarioConDatosDeFormulario.toDTO(usuarioConDatosDeFormulario)

const idLibrosLeidos = usuarioDelBack.librosLeidos.map(libro => libro.id)

const idLibrosALeer = usuarioDelBack.librosALeer.map(libro => libro.id)

const idRecomendaciones = usuarioDelBack.recomendacionesAValorar.map(recomendacion => recomendacion.id)

const Homero = {
  nombre : "Homero",
  apellido : " "
}

const JH = {
  nombre : "Jose",
  apellido : "Hernandez"
}

export const odisea = new LibroDTO(
  1,
  "La Odisea",
  Homero,
  "tapa-libro.jpg",
  1000,
  80000,
  ["Español","Inglés"],
  1000,
  true,
  true
)

export const martinFierro = new LibroDTO(
  2,
  "Martín Fierro",
  JH,
  "tapa-libro.jpg",
  300,
  25000,
  ["Español"],
  150,
  true,
  false
)


const librosStub = [
  odisea,
  martinFierro
]


function endpoint(entidad:string): string {
  return `${URL_SERVIDOR_REST}/${entidad}`
}

export const obtenerHttpClientSpy = () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'post'])

  httpClientSpy.get.withArgs(endpoint("libros")).and.returnValue(of(librosStub))

  httpClientSpy.get.withArgs(endpoint("libros/2")).and.returnValue(of(librosStub[1]))
  
  httpClientSpy.get.withArgs(endpoint("usuarios/1")).and.returnValue(of(usuarioDTODelBack))

  httpClientSpy.put.withArgs(endpoint("usuarios/1"), usuarioConDatosDeFormulario).and.returnValue(of(usuarioConDatosDeFormularioDTO))
  
  httpClientSpy.put.withArgs(endpoint("usuarios/1/actualizar-libros-a-leer"),idLibrosALeer).and.returnValue(of(usuarioDTODelBack))
  
  httpClientSpy.put.withArgs(endpoint("usuarios/1/actualizar-libros-leidos"),idLibrosLeidos).and.returnValue(of(usuarioDTODelBack))
  
  httpClientSpy.put.withArgs(endpoint("usuarios/1/actualizar-recomendaciones-a-valorar"),idRecomendaciones).and.returnValue(of(usuarioDTODelBack))

  return httpClientSpy
}
