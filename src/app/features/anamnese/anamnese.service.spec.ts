import { TestBed } from '@angular/core/testing';

import { AnamneseService } from './anamnese.service';

describe('AnamneseService', () => {
  let service: AnamneseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnamneseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
