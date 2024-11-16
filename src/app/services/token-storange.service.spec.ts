import { TestBed } from '@angular/core/testing';

import { TokenStorangeService } from './token-storange.service';

describe('TokenStorangeService', () => {
  let service: TokenStorangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenStorangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
