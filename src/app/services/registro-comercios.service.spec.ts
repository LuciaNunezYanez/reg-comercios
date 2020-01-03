import { TestBed } from '@angular/core/testing';

import { RegistroComerciosService } from './registro-comercios.service';

describe('RegistroComerciosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistroComerciosService = TestBed.get(RegistroComerciosService);
    expect(service).toBeTruthy();
  });
});
