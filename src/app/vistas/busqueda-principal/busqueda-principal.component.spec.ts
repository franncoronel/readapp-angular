import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BusquedaPrincipalComponent } from './busqueda-principal.component'
import { RouterModule } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { obtenerHttpClientSpy } from '../../data/services/http-client-spy.service'

describe('BusquedaPrincipalComponent', () => {
  let component: BusquedaPrincipalComponent
  let fixture: ComponentFixture<BusquedaPrincipalComponent>
  let httpClientSpy: jasmine.SpyObj<HttpClient>


  beforeEach(async () => {
    httpClientSpy = obtenerHttpClientSpy()
    await TestBed.configureTestingModule({
      imports: [BusquedaPrincipalComponent, RouterModule.forRoot([])],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy } 
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(BusquedaPrincipalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
