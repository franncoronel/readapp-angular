import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GrillaAmigosComponent } from './grilla-amigos.component'
import { obtenerHttpClientSpy } from '../../../data/services/http-client-spy.service'
import { HttpClient } from '@angular/common/http'

describe('GrillaAmigosComponent', () => {
  let component: GrillaAmigosComponent
  let fixture: ComponentFixture<GrillaAmigosComponent>
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(async () => {
    httpClientSpy = obtenerHttpClientSpy()
    await TestBed.configureTestingModule({
      imports: [GrillaAmigosComponent],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]
    })
    .compileComponents()

    fixture = TestBed.createComponent(GrillaAmigosComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
