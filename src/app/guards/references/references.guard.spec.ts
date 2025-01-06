import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { referencesGuard } from './references.guard';

describe('referencesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => referencesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
