import { TestBed } from '@angular/core/testing';

import { TierritasService } from './tierritas.service';

describe('TierritasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TierritasService = TestBed.get(TierritasService);
    expect(service).toBeTruthy();
  });
});
