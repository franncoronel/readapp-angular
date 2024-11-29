// import { ComponentFixture, TestBed } from '@angular/core/testing' 
// import { LoginComponent } from './login.component' 
// import { UsuarioService } from '../../data/services/usuario.service'
// import { HttpTestingController, provideHttpClientTesting  } from '@angular/common/http/testing'
// import { URL_SERVIDOR_REST } from '../../data/services/configuracion'
// import { provideHttpClient } from '@angular/common/http'

// describe('LoginComponent', () => {
//   let component: LoginComponent
//   let fixture: ComponentFixture<LoginComponent>
//   let usuarioService: jasmine.SpyObj<UsuarioService>

//   beforeEach(async () => {
//     const usuarioServiceSpy = jasmine.createSpyObj('UsuarioService', [
//       'verificarCredenciales', 
//       'obtenerUsuarioLogueado', 
//       'guardarUsuarioLogueado', 
//       'estaLogueado'])

//     await TestBed.configureTestingModule({
//       imports: [LoginComponent], 
//       providers: [{ provide: UsuarioService, useValue: usuarioServiceSpy }, 
//         provideHttpClient(),
//         provideHttpClientTesting()]
//     })
//     .compileComponents() 

//     fixture = TestBed.createComponent(LoginComponent) 
//     component = fixture.componentInstance
//     usuarioService = TestBed.inject(UsuarioService) as jasmine.SpyObj<UsuarioService>
//     fixture.detectChanges() 
//   }) 

//   it('should create', () => {
//     expect(component).toBeTruthy() 
//   }) 
  
//   it('debería loguearse con credenciales válidas', async() => {
//     const testUserId = 1
//     usuarioService.verificarCredenciales.and.returnValue(Promise.resolve(testUserId))
//     component.usuario.username = 'admin'
//     component.usuario.password = '12345'
//     // await component.login()
//     expect(usuarioService.verificarCredenciales).toHaveBeenCalledWith('admin', '12345')
//     expect(usuarioService.guardarUsuarioLogueado).toHaveBeenCalledWith(testUserId)
//   })

//   it('no debería loguearse sin credenciales', async() => {
//     usuarioService.verificarCredenciales.and.returnValue(Promise.resolve(undefined)) 
//     component.usuario.username = 'admin'
//     component.usuario.password = '1234'
//     // await component.login()
//     expect(usuarioService.verificarCredenciales).toHaveBeenCalledWith('admin', '1234')
//     expect(component.errorMessage).toBe('Error: El nombre de usuario o la contraseña son inválidos')
//   })
// })



// describe('LoginService', () => {
//   let usuarioService: UsuarioService
//   let httpMock: HttpTestingController
  
//   beforeEach(() => {
//     TestBed.configureTestingModule({providers: [UsuarioService,
//       provideHttpClient(),
//       provideHttpClientTesting()]})
//     usuarioService = TestBed.inject(UsuarioService)
//     httpMock = TestBed.inject(HttpTestingController)
//   })

//   afterEach(() => {
//     httpMock.verify()
//   })

//   it('debería crear el servicio', () => {
//     expect(usuarioService).toBeTruthy()
//   })

//   it('debería obtener todos los usuarios', async () => {
//     const mockUsuariosDTO = [
//       { id: 1, nombre: 'Admin', username: 'admin', password: '12345' },
//     ]
//     usuarioService.obtenerTodosLosUsuarios().then(usuarios => {
//       expect(usuarios.length).toBe(1)
//       expect(usuarios[0].username).toBe('admin')
//     })

//     const req = httpMock.expectOne(`${URL_SERVIDOR_REST}/usuarios`)
//     expect(req.request.method).toBe('GET')
//     req.flush(mockUsuariosDTO) // Simular respuesta del servidor
//   })
//   it('debería ser falso si no está logueado', () => {
//     const estaLogueado = usuarioService.estaLogueado()
//     expect(estaLogueado).toBeFalse()
//   })
// }) 