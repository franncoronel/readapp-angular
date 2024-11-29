import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormularioPerfilComponent } from './formulario-perfil.component'
import { HttpClient } from '@angular/common/http'
import { obtenerHttpClientSpy } from '../../data/services/http-client-spy.service'
import { obtenerViaTestId } from '../../test-utils'
import { Usuario } from '../../data/domain/usuario.domain'
import { UsuarioService } from '../../data/services/usuario.service'

describe('FormularioPerfilComponent', () => {
  let component: FormularioPerfilComponent
  let fixture: ComponentFixture<FormularioPerfilComponent>
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let usuarioLogueado : Usuario
  let mockUsuarioService: jasmine.SpyObj<UsuarioService> 

  beforeEach(async () => {
    httpClientSpy = obtenerHttpClientSpy()
    mockUsuarioService = jasmine.createSpyObj('UsuarioService',['get'])
    usuarioLogueado = new Usuario(1,"Charly","Garcia","charly-g","pubisangelical",new Date(),"charly@garcia",90,"Recurrente",["Leedor","Demandante"],[],[],[],"mono.png",[],0,0)

    await TestBed.configureTestingModule({
      imports: [FormularioPerfilComponent],
      providers: [{ provide:HttpClient,useValue:httpClientSpy},
        { provide: UsuarioService, useValue: mockUsuarioService},
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(FormularioPerfilComponent)
    component = fixture.componentInstance
    await component.cargarUsuario(usuarioLogueado)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  //Testeo de biding
  it('Deberia crearse la vista si tiene un usuario cargado', async () => {
    const principal = obtenerViaTestId(fixture,"contenedor-principal")
    expect(principal).toBeTruthy()
  })

  it('El nombre en pantalla debe combinar con el nombre del usuario', async () => {
    const nombre =obtenerViaTestId(fixture,"usuario-nombre")
    expect(nombre.value).toBe(usuarioLogueado.nombre)

    nombre.value = "Carlos"
    nombre.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    expect("Carlos").toBe(usuarioLogueado.nombre)
  })

  it('El apellido en pantalla debe combinar con el apellido del usuario', async () => {
    const apellido = obtenerViaTestId(fixture,"usuario-apellido")
    expect(apellido.value).toBe(usuarioLogueado.apellido)

    apellido.value = "Aznar"
    apellido.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    expect("Aznar").toBe(usuarioLogueado.apellido)
  })

  it('El username en pantalla debe combinar con el username del usuario', async () => {
    const username =obtenerViaTestId(fixture,"usuario-username")
    expect(username.value).toBe(usuarioLogueado.username)

    username.value = "charliii"
    username.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    expect("charliii").toBe(usuarioLogueado.username)
  })

  it('El email en pantalla debe combinar con el email del usuario', async () => {
    const correo =obtenerViaTestId(fixture,"usuario-correo")
    expect(correo.value).toEqual(usuarioLogueado.email)

    correo.value = "charls@gmail"
    correo.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    expect("charls@gmail").toBe(usuarioLogueado.email)
  })

  it('las palabras por minuto en pantalla debe combinar con las palabras por minuto del usuario', async () => {
    const palabras =obtenerViaTestId(fixture,'usuario-palabras')
    expect(palabras.value).toBe(usuarioLogueado.palabrasPorMinuto.toString())
    
    palabras.value = "10000"
    palabras.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    expect("10000").toBe(usuarioLogueado.palabrasPorMinuto.toString())
  })

  it('La fecha en pantalla debe combinar con la fecha de nacimiento del usuario', async () => {
    const fecha = obtenerViaTestId(fixture,"usuario-fecha")
    expect(fecha.value).toBe(usuarioLogueado.fechaNacimiento.toLocaleDateString('en-CA'))

    fecha.value = new Date(1999,1,20)
    fecha.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    expect(fecha.value).toBe(usuarioLogueado.fechaNacimiento.toString())
  })
  //Testeo de funciones
  it('Debe marcarse solo la opcion que coincide con el tipo del usuario', async () => {
    const tipoActual = obtenerViaTestId(fixture,"usuario-tipo-recurrente")
    const tipoSiguiente = obtenerViaTestId(fixture,"usuario-tipo-ansioso")
    expect(tipoActual.checked).toBeTrue()
    expect(tipoSiguiente.checked).toBeFalse()
    expect(usuarioLogueado.tipoLector).toBe("Recurrente")

    tipoSiguiente.click()
    fixture.detectChanges()
    expect(tipoActual.checked).toBeFalse()
    expect(tipoSiguiente.checked).toBeTrue()
    expect(usuarioLogueado.tipoLector).toBe("Ansioso")
  })

  it('Los criterios del usuario aparecen marcados',()=>{
    const criterioActualQuePosee1 = obtenerViaTestId(fixture,"usuario-criterio-leedor")
    const criterioActualQuePosee2 = obtenerViaTestId(fixture,"usuario-criterio-demandante")
    const criterioQueNoPosee = obtenerViaTestId(fixture,"usuario-criterio-poliglota")
    expect(criterioActualQuePosee1.checked).toBeTrue()
    expect(criterioActualQuePosee2.checked).toBeTrue()
    expect(criterioQueNoPosee.checked).toBeFalse()
  })

  it('Clickear un criterio lo agregara a la lista de criterios del usuario, si ya tiene ese criterio, lo quita', () => {
    spyOn(component,"actualizarCriterios").and.callThrough()
    const criterioQueNoPosee = obtenerViaTestId(fixture,"usuario-criterio-poliglota")
    criterioQueNoPosee.click()
    fixture.detectChanges()
    expect(usuarioLogueado.criterioDeBusqueda).toContain("Poliglota")
    expect(component.actualizarCriterios).toHaveBeenCalled()
    
    criterioQueNoPosee.click()
    fixture.detectChanges()
    expect(usuarioLogueado.criterioDeBusqueda).not.toContain("Poliglota")
    expect(component.actualizarCriterios).toHaveBeenCalled()
  })

  it('Si entre los criterios se encuentra Calculador, debería aparecer la entrada de minimo y maximo', async() => {
    const criterioQueNoPosee = obtenerViaTestId(fixture,"usuario-criterio-calculador")
    const minmaxElemento =  obtenerViaTestId(fixture,"usuario-minimo-maximo")
    expect(minmaxElemento.classList).toContain('oculto')

    criterioQueNoPosee.click()
    fixture.detectChanges()
    expect(minmaxElemento.classList).not.toContain('oculto')
    
  })
})
