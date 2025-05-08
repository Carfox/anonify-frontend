import { TestBed } from '@angular/core/testing';

import { AnonymizeService } from './anonymize.service';

describe('AnonymizeService', () => {
  let service: AnonymizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnonymizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
