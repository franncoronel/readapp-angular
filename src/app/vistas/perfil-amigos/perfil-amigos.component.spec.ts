import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PerfilAmigosComponent } from './perfil-amigos.component'
import { obtenerHttpClientSpy } from '../../data/services/http-client-spy.service'
import { HttpClient } from '@angular/common/http'

describe('PerfilAmigosComponent', () => {
  let component: PerfilAmigosComponent
  let fixture: ComponentFixture<PerfilAmigosComponent>
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(async () => {
    httpClientSpy = obtenerHttpClientSpy()
    await TestBed.configureTestingModule({
      imports: [PerfilAmigosComponent],
      providers: [{provide: HttpClient, useValue: httpClientSpy}]
    })
    .compileComponents()

    fixture = TestBed.createComponent(PerfilAmigosComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
