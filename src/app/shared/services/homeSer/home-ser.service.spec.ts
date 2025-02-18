import { TestBed } from '@angular/core/testing';

import { HomeSerService } from './home-ser.service';

describe('HomeSerService', () => {
  let service: HomeSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
