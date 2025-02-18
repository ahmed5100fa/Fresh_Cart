import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { prevLinkGuard } from './prev-link.guard';

describe('prevLinkGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => prevLinkGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
