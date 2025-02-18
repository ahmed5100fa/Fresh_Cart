import { TestBed } from '@angular/core/testing';

import { WishservService } from './wishserv.service';

describe('WishservService', () => {
  let service: WishservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
