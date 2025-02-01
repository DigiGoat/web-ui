import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { forSaleGuard } from './for-sale.guard';

describe('forSaleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => forSaleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
