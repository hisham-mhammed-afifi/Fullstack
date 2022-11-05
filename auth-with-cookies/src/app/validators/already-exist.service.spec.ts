import { TestBed } from '@angular/core/testing';

import { AlreadyExistService } from './already-exist.service';

describe('AlreadyExistService', () => {
  let service: AlreadyExistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlreadyExistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
